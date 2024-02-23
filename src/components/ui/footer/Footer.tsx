import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="mb-10 flex justify-center text-xs">
      <Link href="/">
        <span className={`${titleFont.className} font-bold antialiased`}>
          Teslo{" "}
        </span>
        <span>| Shop </span>
        <span>
          {"\u00AE"} {new Date().getFullYear()}{" "}
        </span>
      </Link>
      <Link href="/" className="mx-3">
        Privacidad y Legal
      </Link>
      <Link href="/" className="mx-3">
        Ubicaciones
      </Link>
    </div>
  );
};
