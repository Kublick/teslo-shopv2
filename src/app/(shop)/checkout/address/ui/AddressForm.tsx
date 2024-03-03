"use client";
import { ICountry } from "@/intefaces/country";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { countries } from "../../../../../seed/seed-countries";
import { setUserAddress } from "@/actions/address/set-user-address";
import { useSession } from "next-auth/react";
import { deleteUserAddress } from "@/actions/address/delete-user-address";
import { Address } from "@/intefaces/address";
import { useAddressStore } from "@/store/address/address-store";
import { useRouter } from "next/navigation";

const AddressSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  address2: z.string().optional(),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  rememberAddress: z.boolean(),
});

interface Props {
  countries: ICountry[];
  userStoreAddress?: Partial<Address>;
}

type FormInputs = z.infer<typeof AddressSchema>;

export const AddressForm = ({ countries, userStoreAddress = {} }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoreAddress,
      rememberAddress: false,
    },
    resolver: zodResolver(AddressSchema),
  });

  const { data: session } = useSession({
    required: true,
  });

  const setAddress = useAddressStore((state) => state.setAddress);
  const address = useAddressStore((state) => state.address);

  const onSubmit = async (data: FormInputs) => {
    console.log("🚀 ~ onSubmit ~ data:", data);

    if (data.rememberAddress) {
      const { rememberAddress, ...restAddress } = data;

      await setUserAddress(
        {
          address2: restAddress.address2 || "",
          ...restAddress,
        },
        session?.user.id as string,
      );

      router.push("/checkout");
    } else {
      await deleteUserAddress(session?.user.id as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-5"
    >
      <div className="mb-2 flex flex-col">
        <span>Nombres</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("firstName")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Apellidos</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("lastName")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Dirección</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("address")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("address2")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Código postal</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("postalCode")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>Ciudad</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("city")}
        />
      </div>

      <div className="mb-2 flex flex-col">
        <span>País</span>
        <select
          className="rounded-md border bg-gray-200 p-2"
          {...register("country")}
        >
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-2 flex flex-col">
        <span>Teléfono</span>
        <input
          type="text"
          className="rounded-md border bg-gray-200 p-2"
          {...register("phone")}
        />
      </div>

      <div className="mb-2 flex flex-col sm:mt-1">
        <div className="mb-10 inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor="checkbox"
          >
            <input
              type="checkbox"
              className="before:content[''] border-blue-gray-200 before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
              id="checkbox"
              {...register("rememberAddress")}
            />
            <div className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>¿Recorder Dirección?</span>
        </div>

        <button
          disabled={!isValid}
          // href="/checkout"
          type="submit"
          className={clsx({
            "btn-primary": isValid,
            "btn-disabled": !isValid,
          })}
        >
          Siguiente
        </button>
      </div>
    </form>
  );
};
