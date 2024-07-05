import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "User",
};

export default function TeamsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {children}
    </section>
  )
}