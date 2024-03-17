"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (id: string, role: string) => {
  const newRole = role === "admin" ? "admin" : "user";

  const session = await auth();

  if (session?.user?.role !== "admin") {
    return { ok: false, message: "Unauthorized" };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");
    return { ok: true };
  } catch (error) {
    throw new Error("No se pudo actualizar el rol del usuario");
  }
};
