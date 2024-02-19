"use server";
import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string): Promise<Number> => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    if (!stock) return 0;

    return stock.inStock;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting stock by slug");
  }
};
