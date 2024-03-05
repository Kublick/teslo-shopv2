import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import { AddressForm } from "./ui/AddressForm";
import { getCountries } from "@/actions/country/getCountries";
import { countries } from "../../../../seed/seed-countries";
import { ICountry } from "@/intefaces/country";
import { getUserdAddress } from "@/actions/address/get-user-address";
import { auth } from "@/auth.config";

export default async function AddressPage() {
  const session = await auth();
  const countries = await getCountries();

  if (!session?.user) {
    return <h3 className="text-5xl">No hay sesion de usuario...</h3>;
  }

  const userAddress = (await getUserdAddress(session?.user.id as string)) ?? {};

  return (
    <div className="mb-72 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex  w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Dirección" subtitle="Dirección de entrega" />
        <AddressForm countries={countries} userStoreAddress={userAddress} />
      </div>
    </div>
  );
}
