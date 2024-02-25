import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  return (
    <main className=" flex justify-center">
      <div className="w-full px-10 sm:w-[350px]">{children}</div>
    </main>
  );
}
