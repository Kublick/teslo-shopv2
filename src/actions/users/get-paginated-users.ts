"use server";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return { ok: false, message: "Debe ser usuario administrador" };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return {
      ok: true,
      users: users,
    };
  } catch (error) {
    throw new Error("Error getting users");
  }
};
