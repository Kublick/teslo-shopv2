"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return {
      ok: false,
      message: "debe estar autorizado",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      // take: take,
      // skip: (page - 1) * take,
    });

    return {
      ok: true,
      orders,
    };
  } catch (error) {
    throw new Error("Error getting products");
  }
};
