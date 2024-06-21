import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MenuProvider from "@/context/MenuProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      <MenuProvider>
        <body className={inter.className}>
          <Header/>
          <main className=" m-0 p-0 pt-10">{children}</main>
          <Footer/>
        </body>
      </MenuProvider>
    </html>
  );
}
