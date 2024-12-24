import type { Metadata } from "next";

import { Quicksand } from "next/font/google";

import "./globals.css";
import NavBar from "./components/Navbar";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerizim Villarante",
  description: "Gerizim Villarante's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} bg-neutral-100 font-sans antialiased`}
      >
        <div className="flex flex-col p-2 lg:flex-row">
          <NavBar className="w-full self-start lg:w-min" />
          <main className="relative grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
