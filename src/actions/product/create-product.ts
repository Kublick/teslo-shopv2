"use server";

import { Size } from "@/intefaces/product";
import prisma from "@/lib/prisma";
import { Gender, Product } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  api_key: process.env.CLOUDINARY_API_KEY ?? "",
  api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce.string().transform((val) => Number(val)),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  // images: z.array(z.any()).optional(),
});

export const createProduct = async (formData: FormData) => {
  console.log("launching data");

  const data = Object.fromEntries(formData);

  const productParse = productSchema.safeParse(data);

  if (!productParse.success) {
    return { ok: false };
  }

  const product = productParse.data;

  product.slug = product.slug.toLowerCase().replace(/ /g, "-");

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async () => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        // Proceso de carga de inagenes
        if (formData.getAll("images")) {
          const images = await uploadImages(
            formData.getAll("images") as File[],
          );
          if (!images) {
            throw new Error("Error uploading images");
          }

          await prisma.productImage.createMany({
            data: images.map((image) => ({
              url: image!,
              productId: product.id,
            })),
          });
        }

        // Todo! Revalidate path
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });

        if (formData.getAll("images")) {
          const images = await uploadImages(
            formData.getAll("images") as File[],
          );
          if (!images) {
            throw new Error("Error uploading images");
          }

          await prisma.productImage.createMany({
            data: images.map((image) => ({
              url: image!,
              productId: product.id,
            })),
          });
        }
      }

      console.log(product);
      return {
        product,
      };
    });

    //Todo revalidate Path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
};

const uploadImages = async (images: File[]) => {
  console.log("launching test");
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64}`)
          .then((res) => res.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });
    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
