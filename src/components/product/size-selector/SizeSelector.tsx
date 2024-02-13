import { type Size } from "@/intefaces/product";
import clsx from "clsx";
import React from "react";

interface Props {
  selectedSize: Size;
  availableSizes: Size[];
}

const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
  return (
    <div className="my-5 ">
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            type="button"
            key={size}
            className={clsx("mx-2 hover:underline", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
