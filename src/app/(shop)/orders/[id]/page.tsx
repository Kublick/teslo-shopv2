import Link from "next/link";

import Image from "next/image";

import { initialData } from "@/seed/seed";
import { Title } from "@/components/ui/title/Title";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  // redirect('/empty');

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden numero ${id}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <div
              className={clsx(
                "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                { "bg-red-500": false },
                { "bg-green-700": true },
              )}
            >
              <IoCardOutline size={30} />{" "}
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="mb-5 flex">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  {/* <QuantitySelector quantity={ 3 } /> */}

                  <button className="mt-3 underline">Remover</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
            <div>
              <p>Max Blancarte</p>
              <p>Una direccion</p>
              <p>Col. Centro</p>
              <p>Alcadia Cuauthémoc</p>
              <p>CP. 22111</p>
              <p>123.13.132</p>
            </div>
            <div className="my-10 h-0.5 w-full rounded bg-gray-200" />
            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">$ 100</span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <div
                className={clsx(
                  "mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white",
                  { "bg-red-500": false },
                  { "bg-green-700": true },
                )}
              >
                <IoCardOutline size={30} />{" "}
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
