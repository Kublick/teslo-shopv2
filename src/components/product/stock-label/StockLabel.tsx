"use client";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);

    setStock(Number(inStock));
    setLoading(false);
  };

  useEffect(() => {
    getStock();
  });

  return (
    <>
      {loading ? (
        <h1
          className={`${titleFont.className} animate-pulse bg-gray-200 text-xl font-bold antialiased`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};

export default StockLabel;
