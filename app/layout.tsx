import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuProvider from "@/context/MenuProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProviders } from "./SessionProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eventastic",
  description: "Where Every Event Shines",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviders>
          <MenuProvider>
            <Header />
            <main className="m-0 p-0 pt-10">{children}</main>
            <Footer />
          </MenuProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
