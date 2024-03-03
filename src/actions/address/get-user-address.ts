"use server";

import prisma from "@/lib/prisma";

export const getUserdAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!address) {
      return null;
    }

    const { countryId, ...rest } = address;

    return {
      ...rest,
      country: countryId,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error getting user address",
    };
  }
};
