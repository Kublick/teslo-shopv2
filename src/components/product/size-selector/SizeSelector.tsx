"use client";

import { type Size } from "@/intefaces/product";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5 ">
      <h3 className="mb-4 font-bold">Available Sizes</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            onClick={() => {
              onSizeChanged(size);
            }}
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
