"use server";

import { auth } from "@/auth.config";
import { Address } from "@/intefaces/address";
import { Size } from "@/intefaces/product";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) return { ok: false, message: "No hay sesion de usuario" };

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  });

  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0,
  );

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`Product no existe: ${item.productId}`);

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;
      console.log(totals);
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Actualizar el stock de los productos

      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((count, p) => count + p.quantity, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} No tiene suficiente stock`);
        }
      });

      // Crear la orden - Encabezado
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                quantity: p.quantity,
                size: p.size,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        updatedProducts,
        order,
        orderAddress,
      };
    });

    console.log({ prismaTx });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, error: error.message };
    }
  }
};
