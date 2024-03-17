"use client";

import { ProductImage } from "@/components/product/product-image/ProductImage";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";

import Link from "next/link";
// import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  //   const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct);
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
          <ProductImage
            src={product.image}
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
            <Link
              className="cursor-pointer hover:underline"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>

            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(value) =>
                updateProductQuantity(product, value)
              }
            />

            <button
              onClick={() => removeProduct(product)}
              className="mt-3 underline"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
