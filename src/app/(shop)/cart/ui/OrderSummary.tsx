"use client";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormater } from "@/utils/currencyFormater";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const OrderSummary = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
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
  );
};
