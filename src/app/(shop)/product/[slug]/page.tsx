export const revalidate = 600408;
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import { titleFont } from "@/config/fonts";

import { notFound } from "next/navigation";

import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import ProductSlideShow from "@/components/product/slideshow/ProductSlideShow";
import ProductMobileSlideShow from "@/components/product/slideshow/ProductMobileSlideShow";
import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { Metadata, ResolvingMetadata } from "next";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "Producto no encontrado",
    // openGraph: {
    //   title: product?.title ?? "Producto no encontrado",
    //   description: product?.description ?? "Producto no encontrado",
    //   images: [`/products/${product?.images[1]}`],
    // },
  };
}

export default async function ProductByIdPage({ params }: Props) {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mb-20 mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1  px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg">${product.price}</p>

        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />

        <QuantitySelector quantity={2} />

        <button type="button" className="btn-primary my-5">
          Agregar al carrito
        </button>

        <h3 className="text-sm font-bold">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
