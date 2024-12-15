import type { Metadata } from 'next';

import { Quicksand } from 'next/font/google';

import './globals.css';

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Gerizim Villarante',
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
        className={`${quicksand.variable} flex flex-col items-center font-sans antialiased`}
      >
        <main className="max-w-screen-2xl w-full">{children}</main>
      </body>
    </html>
  );
}
