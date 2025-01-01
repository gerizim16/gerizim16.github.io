"use client";
import useTheme from "@/store/useTheme";
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

export default function Body(props: ComponentPropsWithoutRef<"body">) {
  const dim = useTheme.use.dim();

  return (
    <body
      {...props}
      className={twMerge(
        props.className,
        "transition-colors",
        !dim ? "bg-neutral-200 text-black" : "bg-neutral-900",
      )}
    />
  );
}
