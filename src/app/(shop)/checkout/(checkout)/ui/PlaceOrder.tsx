"use client";

import { placeOrder } from "@/actions/order/place-order";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormater } from "@/utils/currencyFormater";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const address = useAddressStore((state) => state.address);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        size: product.size,
      };
    });

    const resp = await placeOrder(productsToOrder, {
      address2: address.address2 ? address.address2 : "",
      ...address,
    });

    if (!resp?.ok) {
      setIsPlacingOrder(false);

      setErrorMessage(resp?.error || "Error al colocar la orden");
      return;
    }

    clearCart();
    router.replace(`/orders/${resp?.order?.id}`);
  };

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-2 text-2xl font-bold">Dirección de entrega</h2>
      <div>
        <p>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.postalCode}</p>
        <p>{address.phone}</p>
      </div>
      <div className="my-10 h-0.5 w-full rounded bg-gray-200" />
      <h2 className="mb-2 text-2xl">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 Articulo" : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right"> {currencyFormater(tax)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormater(subTotal)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-right text-2xl">
          {currencyFormater(total)}
        </span>
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
        <p className="mt-2 text-red-500">{errorMessage}</p>
        <button
          className={clsx(" mt-2 flex justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          disabled={isPlacingOrder}
          onClick={onPlaceOrder}
          //   href="/orders/123"
        >
          Colocar Orden
        </button>
      </div>
    </div>
  );
};
