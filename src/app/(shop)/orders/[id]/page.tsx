import Image from "next/image";

import { Title } from "@/components/ui/title/Title";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions/order/get-order-id";
import { currencyFormater } from "../../../../utils/currencyFormater";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    redirect("/");
  }

  const { OrderAddress: address, OrderItem: products } = order;

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden numero #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <div
              className={clsx(
                "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                { "bg-red-500": !order.isPaid },
                { "bg-green-700": order.isPaid },
              )}
            >
              <IoCardOutline size={30} />{" "}
              {order.isPaid ? (
                <span className="mx-2">Pagada</span>
              ) : (
                <span className="mx-2">Pendiente de pago</span>
              )}
            </div>

            {/* Items */}

            {products.map((item, index) => (
              <div key={item.product.slug + index} className="mb-5 flex">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${currencyFormater(item.price)} x {order.itemsInOrder}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormater(item.price)} x{" "}
                    {order.itemsInOrder}
                  </p>

                  {/* <button className="mt-3 underline">Remover</button> */}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
            <div>
              <p>{address?.firstName}</p>
              <p>{address?.lastName}</p>
              <p>{address?.address}</p>
              <p>{address?.address2}</p>
              <p>{address?.city}</p>
              <p>
                {address?.postalCode}, {address?.countryId}
              </p>
              <p>{address?.phone}</p>
            </div>
            <div className="my-10 h-0.5 w-full rounded bg-gray-200" />
            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{order.itemsInOrder}</span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormater(order.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right"> {currencyFormater(order.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">
                {" "}
                {currencyFormater(order.total)}
              </span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <div
                className={clsx(
                  "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                  { "bg-red-500": order.isPaid === false },
                  { "bg-green-700": order.isPaid === true },
                )}
              >
                <IoCardOutline size={30} />{" "}
                {order.isPaid ? (
                  <span className="mx-2">Pagada</span>
                ) : (
                  <span className="mx-2">Pendiente de pago</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
