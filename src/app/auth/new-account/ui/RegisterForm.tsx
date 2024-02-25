"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { registerUser } from "@/actions/auth/register";
import { login } from "@/actions/auth/login";
import { useRouter } from "next/router";

const FormSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre es requerido",
  }),
  email: z.string().email({ message: "El email no es valido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type FormInputs = z.infer<typeof FormSchema>;

export const RegisterForm = () => {
  const [errorMessage, setErroMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    setErroMessage("");

    const { name, email, password } = data;

    const resp = await registerUser(name, email, password);

    if (!resp.ok) {
      setErroMessage(resp.message || "No se pudo crear el usuario");
    }

    login(email.toLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <p className="text-red-500">No se pudo crear usuario</p>
        )}
        <label htmlFor="email">Nombre Completo</label>
        <input
          className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
            "border-red-500": errors.name,
          })}
          type="text"
          {...register("name")}
        />

        <label htmlFor="email">Email</label>
        <input
          className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
            "border-red-500": errors.email,
          })}
          type="email"
          {...register("email")}
        />
        <label htmlFor="email">Contraseña</label>
        <input
          className={clsx("mb-5 rounded border bg-gray-200 px-5 py-2", {
            "border-red-500": errors.password,
          })}
          {...register("password")}
          type="password"
        />

        <button className="btn-primary">Crear Cuenta</button>

        {/* divisor l ine */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </form>
    </div>
  );
};
