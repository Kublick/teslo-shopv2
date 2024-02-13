"use client";
import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };
  return (
    <div className="flex items-center ">
      <IoRemoveCircleOutline size={30} onClick={() => onQuantityChange(-1)} />
      <span className="mx-3 w-20 rounded bg-gray-100 px-5 text-center">
        {count}
      </span>
      <IoAddCircleOutline size={30} onClick={() => onQuantityChange(+1)} />
    </div>
  );
};

export default QuantitySelector;
