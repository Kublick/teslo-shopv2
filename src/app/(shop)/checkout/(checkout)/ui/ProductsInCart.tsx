"use client";

import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";

// import { useEffect, useState } from "react";
import { currencyFormater } from "../../../../../utils/currencyFormater";

export const ProductsInCart = () => {
  //   const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  //   useEffect(() => {
  //     setLoaded(true);
  //   }, []);

  if (!productsInCart.length) return <p>Loading...</p>;

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug} - ${product.size} `} className="mb-5 flex">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            priority={true}
            className="mr-5 rounded"
          />

          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold">
              {currencyFormater(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
