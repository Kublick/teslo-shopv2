import Siderbar from "@/components/ui/sidebar/Siderbar";
import { TopMenu } from "@/components/ui/top-menu/top-menu";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen ">
      <TopMenu />
      <Siderbar />
      <div className="px-0 sm:px-10">{children}</div>
    </main>
  );
}
