import type { Metadata } from "next";

import { Quicksand } from "next/font/google";

import "./globals.css";
import Body from "./components/Body";
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
      <Body className={`${quicksand.variable} font-sans antialiased`}>
        <div className="relative isolate flex flex-col lg:flex-row">
          <NavBar className="z-10 w-full self-start p-2 lg:w-min" />
          <main className="relative grow p-2">{children}</main>
        </div>
      </Body>
    </html>
  );
}
