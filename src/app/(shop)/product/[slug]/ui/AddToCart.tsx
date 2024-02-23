"use client";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";

import { CartProduct, Product, Size } from "@/intefaces/product";
import { useCartStore } from "@/store/cart/cart-store";

import React, { useState } from "react";

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);
    if (size === undefined) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-600">
          Debe de seleccionar una talla*
        </span>
      )}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      <button onClick={addToCart} className="btn-primary my-5">
        Add to cart
      </button>
    </>
  );
};

export default AddToCart;
