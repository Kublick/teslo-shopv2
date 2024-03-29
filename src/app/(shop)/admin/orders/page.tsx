import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { Title } from "@/components/ui/title/Title";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function AdminOrderPage() {
  const resp = await getPaginatedOrders();

  if (!resp?.ok) {
    redirect("/auth/login");
  }

  const { orders } = resp;

  return (
    <>
      <Title title="Todas las Ordenes" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                #ID
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Estado
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o: any) => (
              <tr
                className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                key={o.id}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  {o.id.split("-").at(-1)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  {o.OrderAddress?.firstName} {o.OrderAddress?.lastName}
                </td>
                <td className="flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
                  {o.isPaid ? (
                    <span className="mx-2 flex items-center gap-2 text-green-700">
                      <IoCardOutline />
                      Pagada
                    </span>
                  ) : (
                    <span className="mx-2 flex items-center gap-2 text-red-700">
                      <IoCardOutline />
                      Pendiente de pago
                    </span>
                  )}
                </td>
                <td className="px-6 text-sm font-light text-gray-900 ">
                  <Link href={`/orders/${o.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
