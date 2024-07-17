import type { Metadata } from "next";
import Sidebar from "../../components/Organizer/SideBar";
import ProtectedLayout from "@/app/components/Organizer/ProtectedLayout";

export const metadata: Metadata = {
  title: "Organizer",
  description: "Organizer",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout>
      <section className="flex flex-row bg-gray-100 h-auto">
        <Sidebar />
        <div className="py-12 px-4 w-full">{children}</div>
      </section>
    </ProtectedLayout>
  );
}
