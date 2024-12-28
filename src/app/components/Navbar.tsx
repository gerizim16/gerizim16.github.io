"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import StickyBox from "react-sticky-box";
import { twMerge } from "tailwind-merge";

export const links = {
  Photography: "/photography",
  // "Software Dev": "/software",
} as const;

interface NavBarProps {
  className?: HTMLElement["className"];
}

export default function NavBar({ className }: NavBarProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <StickyBox
      className={twMerge(
        "flex flex-row items-baseline gap-4 py-2 lg:flex-col lg:items-stretch lg:pl-4 lg:pr-8",
        className,
      )}
      offsetTop={8}
    >
      <h1 className="w-min whitespace-nowrap text-right text-2xl font-black uppercase lg:whitespace-normal lg:text-2xl xl:text-3xl">
        Gerizim Villarante
      </h1>
      <div className="grow lg:grow-0" />
      <ul className="flex flex-row items-end gap-2 text-lg lg:flex-col">
        {Object.entries(links).map(([title, href]) => (
          <Link
            className="transition-all hover:-translate-x-2"
            key={href}
            href={href}
            scroll={`/${segment}` !== href}
          >
            <li>{title}</li>
          </Link>
        ))}
      </ul>
    </StickyBox>
  );
}
