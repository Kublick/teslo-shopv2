"use client";
import { logout } from "@/actions/auth/logout";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { useSession } from "next-auth/react";

const Siderbar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;

  return (
    <div>
      {isSideMenuOpen && (
        <>
          <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            onClick={() => closeMenu()}
            className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter"
          />
        </>
      )}
      <nav
        className={clsx(
          "fixed right-0 top-0 z-20 h-screen w-[500px] transform bg-white p-5 transition-all duration-300",
          {
            "translate-x-0": isSideMenuOpen,
            "translate-x-full": !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => closeMenu()}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute left-2 top-2" />
          <input
            type="text"
            placeholder="Buscar productos"
            className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 text-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
        <Link
          onClick={() => closeMenu()}
          href={"/profile"}
          className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
        >
          <IoPersonOutline size={30} />
          <span className="ml-3 text-xl">Perfil</span>
        </Link>
        <Link
          href={"/"}
          className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
        >
          <IoTicketOutline size={30} />
          <span className="ml-3 text-xl">Ordenes</span>
        </Link>
        {isAuthenticated ? (
          <button
            className="mt-10 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100"
            onClick={() => logout()}
          >
            <IoLogOutOutline size={30} />
            <span className="ml-3 text-xl">Salir</span>
          </button>
        ) : (
          <Link
            href={"/auth/login"}
            className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoLogInOutline size={30} />
            <span className="ml-3 text-xl">Ingresar</span>
          </Link>
        )}
        {isAuthenticated && session.user?.role === "admin" && (
          <>
            <div className="my-10 h-px w-full bg-gray-200" />
            <Link
              href={"/"}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoShirtOutline size={30} />
              <span className="ml-3 text-xl">Productos</span>
            </Link>
            <Link
              href={"/"}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoTicketOutline size={30} />
              <span className="ml-3 text-xl">Ordenes</span>
            </Link>
            <Link
              href={"/"}
              className="mt-10 flex items-center rounded p-2 transition-all hover:bg-gray-100"
            >
              <IoPeopleOutline size={30} />
              <span className="ml-3 text-xl">Usuarios</span>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Siderbar;
