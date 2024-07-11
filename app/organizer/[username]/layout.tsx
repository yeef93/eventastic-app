import type { Metadata } from "next";
import Sidebar from "../../components/Organizer/SideBar";

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
    <section className="flex flex-row bg-gray-100 h-auto">
      <Sidebar />
      <div className="pt-12 px-4 w-full">{children}</div>
    </section>
  );
}