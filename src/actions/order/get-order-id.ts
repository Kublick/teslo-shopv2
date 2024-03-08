"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  const session = await auth();

  if (!session?.user) {
    return { ok: false, message: "No hay sesion de usuario" };
  }
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      throw `${orderId} orden no existe`;
    }

    if (session.user.role === "user") {
      if (order.userId !== session.user.id) {
        return { ok: false, message: "No tienes permiso para ver esta orden" };
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Error getting order",
    };
  }
};
