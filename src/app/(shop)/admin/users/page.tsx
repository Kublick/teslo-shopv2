import { getOrdersByUser } from "@/actions/order/get-orders-by-user";
import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { Title } from "@/components/ui/title/Title";
import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UserTable } from "./ui/Usuarios";
import { getPaginatedUsers } from "@/actions/users/get-paginated-users";
import Pagination from "@/components/ui/pagination/Pagination";
import { changeUserRole } from "@/actions/users/change-user-role";

export default async function AdminUsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (ok === false) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de Usuarios" />

      <div className="mb-10">
        <UserTable users={users} />
        <Pagination totalPages={1} />
      </div>
    </>
  );
}
