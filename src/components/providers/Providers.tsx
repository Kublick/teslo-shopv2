"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
          intent: "capture",
          currency: "USD",
        }}
      >
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default Providers;
