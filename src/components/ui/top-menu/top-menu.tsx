"use client";
import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import React from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

export const TopMenu = () => {
  console.log("lol");
  const openMenu = useUiStore((state) => state.openSideMenu);
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
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/category/kid"
        >
          Niños
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/search">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link href="/cart">
          <div className="relative">
            <span className="rouded-full absolute -right-2 -top-2 bg-blue-700 px-1 text-xs font-bold text-white">
              3
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
