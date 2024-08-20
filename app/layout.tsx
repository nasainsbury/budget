import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <nav className="bg-black flex justify-between text-white px-12 py-4 items-center">
          <h1 className="text-2xl font-semibold">Financial Calculator</h1>
          <ul className="flex gap-x-12">
            <li>
              <Link href="/">Monthly Budget</Link>
            </li>
            <li>
              <Link href="/house">Yearly Budget</Link>
            </li>
          </ul>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
