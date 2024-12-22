"use client";

import type Masonry from "masonry-layout";

import importAll from "@/utils/importAll";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const images = importAll(
  require.context("/public/media", false, /\.(png|jpe?g|svg)$/),
) as Array<StaticRequire>;

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry>(null);

  const sizerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>();

  useLayoutEffect(() => {
    const getwidth = () => {
      setWidth(sizerRef.current?.offsetWidth);
    };
    getwidth();
    window.addEventListener("resize", getwidth);
    return () => window.removeEventListener("resize", getwidth);
  }, []);

  useEffect(() => {
    (async () => {
      const Masonry = (await import("masonry-layout")).default;
      masonryRef.current = new Masonry(containerRef.current ?? "", {
        itemSelector: ".item",
        columnWidth: ".item-width",
      });
    })();
  }, []);

  return (
    <div
      ref={containerRef}
      className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] 2xl:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))]"
    >
      <div ref={sizerRef} className="item-width" />
      {images.map((image) => (
        <Item key={image.default.src} image={image} width={width ?? 0} />
      ))}
    </div>
  );
}

interface ItemProps {
  image: StaticRequire;
  width: number;
}

function Item({ image, width }: ItemProps) {
  return (
    <Image
      key={image.default.src}
      src={image}
      width={width}
      alt=""
      className="item p-1"
      style={{ width }}
    />
  );
}
