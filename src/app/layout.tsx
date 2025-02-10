import type { Metadata } from "next";

import { Quicksand } from "next/font/google";

import "./globals.css";
import Body from "./components/Body";

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
        {children}
      </Body>
    </html>
  );
}
