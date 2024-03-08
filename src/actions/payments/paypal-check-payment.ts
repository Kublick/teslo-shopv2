"use server";

import { PaypalOrderStatusResponse } from "@/intefaces/paypal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPayPalBearerToken();
  console.log("🚀 ~ paypalCheckPayment ~ authToken:", authToken);
  const verification = await verifyPayPalPayment(transactionId, authToken);
  console.log("🚀 ~ paypalCheckPayment ~ verification:", verification);

  if (!verification) {
    return {
      ok: false,
      error: "Error checking payment",
    };
  }

  const { status, purchase_units } = verification;

  if (status !== "COMPLETED") {
    return {
      ok: false,
      error: "Payment not completed",
    };
  }

  try {
    await prisma.order.update({
      where: { id: purchase_units[0].invoice_id },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
  } catch (error) {
    return {
      ok: false,
      error: "El pago no se pudo realizar",
    };
  }

  revalidatePath(`/orders/${purchase_units[0].invoice_id}`);

  return {
    ok: true,
  };
};

const getPayPalBearerToken = async () => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  transactionId: string,
  bearerToken: string,
): Promise<PaypalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    console.log({ resp });
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
