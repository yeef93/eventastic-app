export const metadata = {
  title: "tes",
  description: "Where Every Event Shines",
}

export default function RootLayout({
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
