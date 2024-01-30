"use client";
import { Product } from "@/intefaces/product";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  product: Product;
}

const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  const { title, images, slug, price } = product;

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={title}
          width={500}
          height={500}
          className="w-full object-cover rounded"
          onMouseEnter={() => setDisplayImage(images[1])}
          onMouseLeave={() => setDisplayImage(images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${slug}`} className="hover:text-blue-600">
          {title}
        </Link>
        <span className="fondo">${price}</span>
      </div>
    </div>
  );
};

export default ProductGridItem;
