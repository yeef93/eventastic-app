import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventastic | Event List",
  description: "Eventastic | Event List",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}