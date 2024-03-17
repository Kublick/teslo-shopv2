"use client";

import React from "react";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";
import { User } from "../../../../../intefaces/user";
import { changeUserRole } from "@/actions/users/change-user-role";

interface Props {
  users: User[];
}

export const UserTable = ({ users }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="border-b bg-gray-200">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Email
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
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user: any) => (
          <tr
            className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
            key={user.id}
          >
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              {user.email}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
              {user.name}
            </td>
            <td className="flex items-center whitespace-nowrap  px-6 py-4 text-sm font-light text-gray-900">
              <select
                className="w-full p-2 text-sm text-gray-900"
                value={user.role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
