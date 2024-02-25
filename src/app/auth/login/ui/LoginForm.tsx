"use client";
import { authenticate } from "@/actions/auth/login";
import clsx from "clsx";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state === "Success") {
      router.replace("/");
    }
  }, [state, router]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        name="email"
        type="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        type="password"
        name="password"
      />

      {state === "Credenciales invalidas" && (
        <div className="mb-2 flex gap-2">
          <IoInformationOutline className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">Credenciales Invalidas</p>
        </div>
      )}

      <LoginButton />
      {/* <button type="submit" className="btn-primary">
        Ingresar
      </button> */}

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
    >
      Ingresar
    </button>
  );
}
