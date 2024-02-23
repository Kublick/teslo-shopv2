import Link from "next/link";

import Image from "next/image";

import { initialData } from "@/seed/seed";
import { Title } from "@/components/ui/title/Title";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckOutPage() {
  // redirect('/empty');

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Carrito */}
          <div className="mt-5 flex flex-col">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="mb-5 underline">
              Editar carrito
            </Link>

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
              <span className="text-xs">
                Al hacer click en Colocar orden, aceptas nuestros{" "}
                <a href="#" className="underline">
                  términos y condiciones
                </a>{" "}
                y{" "}
                <a href="#" className="underline">
                  politicas de privacidad
                </a>
              </span>
              <Link
                className="btn-primary mt-2 flex justify-center"
                href="/orders/123"
              >
                Colocar Orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
