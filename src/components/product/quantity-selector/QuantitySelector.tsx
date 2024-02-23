"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChanged(quantity + value);
  };

  return (
    <div className="flex items-center ">
      <IoRemoveCircleOutline size={30} onClick={() => onValueChanged(-1)} />
      <span className="mx-3 w-20 rounded bg-gray-100 px-5 text-center">
        {quantity}
      </span>
      <IoAddCircleOutline size={30} onClick={() => onValueChanged(+1)} />
    </div>
  );
};

export default QuantitySelector;
