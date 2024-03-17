"use client";

import {
  Product,
  ProductCategory,
  ProductImage as ProductWithImage,
} from "@/intefaces/product";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import clsx from "clsx";
import { createProduct } from "@/actions/product/create-product";

import { useRouter } from "next/navigation";
import { ProductImage } from "@/components/product/product-image/ProductImage";
import { deleteProductImage } from "@/actions/product/delete-product-image";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: ProductCategory[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const FormSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number().min(0),
  inStock: z.number(),
  sizes: z.array(z.string()),
  tags: z.string(),
  gender: z.enum(["men", "women", "kid", "unisex"]),
  categoryId: z.string(),
  images: z.array(z.any().optional()),
  // images: z.array(z.any() as ZodType<FileList>).optional(),
});

type FormInput = z.infer<typeof FormSchema>;

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInput>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  });

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues("sizes"));

    sizes.has(size) ? sizes.delete(size) : sizes.add(size);

    setValue("sizes", Array.from(sizes));
  };

  const onSubmit = async (data: FormInput) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;

    if (product.id) formData.append("id", product.id);

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("gender", productToSave.gender);

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      console.log("done");
    }

    const { ok, product: dbProduct } = await createProduct(formData);
    console.log("🚀 ~ onSubmit ~ ok:", ok);

    if (!ok) {
      return alert("Error al guardar el producto");
    }

    router.replace(`/admin/products/${dbProduct?.slug}`);
  };
  watch("sizes");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Título</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register("title")}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Slug</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register("slug")}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="rounded-md border bg-gray-200 p-2"
            {...register("description")}
          ></textarea>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Price</span>
          <input
            type="number"
            className="rounded-md border bg-gray-200 p-2"
            {...register("price")}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Tags</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register("tags")}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Gender</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register("gender")}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Categoria</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register("categoryId")}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}

      <div className="w-full">
        {/* As checkboxes */}

        <div className="mb-2 flex flex-col">
          <span>Inventario</span>
          <input
            type="number"
            className="rounded-md border bg-gray-200 p-2"
            {...register("inStock")}
          />
        </div>
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                onClick={() => onSizeChange(size)}
                key={size}
                className={clsx(
                  "mb-2 mr-2 w-14 cursor-pointer rounded-md border p-2 text-center transition-all",
                  {
                    "bg-blue-500 text-white": getValues("sizes").includes(size),
                  },
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="mb-2 flex flex-col">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="rounded-md border bg-gray-200 p-2"
              accept="image/png, image/jpeg, image/avif"
              {...register("images")}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ""}
                  width={300}
                  height={300}
                  className="rounded-t shadow-md"
                />
                <button
                  type="button"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
