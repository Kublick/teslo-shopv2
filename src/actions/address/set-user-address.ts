"use server";

import { Address } from "@/intefaces/address";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      messaage: "Error setting user address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAdress = await prisma.userAddress.findUnique({
      where: {
        userId: userId,
      },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      firstName: address.firstName,
      lastName: address.lastName,
      city: address.city,
      phone: address.phone,
      postalCode: address.postalCode,
      countryId: address.country,
    };

    if (!storeAdress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });

      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);

    throw new Error("Error creating or replacing address");
  }
};
