"use client";
import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/cart/cart-store";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openMenu = useUiStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = React.useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <nav className="flex w-full items-center justify-between px-5">
      <Link href="/">
        <span className={`${titleFont.className} font-bold antialiased`}>
          Teslo
        </span>
        <span> | Shop</span>
      </Link>
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link href={totalItemsInCart === 0 && loaded ? "/empty" : "/cart"}>
          <div className="relative">
            <span className="fade-in rouded-full absolute -right-2 -top-2 bg-blue-700 px-1 text-xs font-bold text-white">
              {loaded && totalItemsInCart > 0 ? totalItemsInCart : 0}
            </span>
            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>
        <button
          type="button"
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          onClick={() => openMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
