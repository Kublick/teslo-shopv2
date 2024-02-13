import ProductGrid from "@/components/products/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { Category } from "@/intefaces/product";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;

  const products = initialData.products.filter(
    (product) => product.gender === id,
  );

  const labels: Record<Category, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "para Todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos de ${labels[id]}`}
        subtitle={"Todos los productos"}
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
