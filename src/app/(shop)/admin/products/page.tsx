import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { getPaginatedProductsWithImages } from "@/actions/product";
import Pagination from "@/components/ui/pagination/Pagination";
import { Title } from "@/components/ui/title/Title";
import { currencyFormater } from "@/utils/currencyFormater";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { Gender } from "@prisma/client";
import { ProductImage } from "@/components/product/product-image/ProductImage";

interface Props {
  searchParams: {
    page?: string;
  };
}
export default async function AdminProductPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page });

  return (
    <>
      <Title title="Mantenimiento de productos" />
      <div className="mb-4 flex justify-end">
        <Link href={"/admin/product/new"} className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Genero
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Stock
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((o: any) => (
              <tr
                className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                key={o.id}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  <Link href={`/admin/product/${o.slug}`}>
                    <ProductImage
                      src={`${o.ProductImage[0]?.url}`}
                      width={80}
                      height={80}
                      alt={`o.title`}
                      className="h-20 w-20 rounded object-cover"
                    />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  <Link href={`/product/${o.slug}`} className="hover:underline">
                    {o.title}
                  </Link>
                </td>
                <td className=" whitespace-nowrap  px-6 py-4 text-sm font-bold text-gray-900">
                  {currencyFormater(o.price)}
                </td>
                <td className=" whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
                  {o.gender}
                </td>
                <td className=" whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
                  {o.inStock}
                </td>
                <td className=" whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
                  {o.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
