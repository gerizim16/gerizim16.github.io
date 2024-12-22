"use client";

import type Masonry from "masonry-layout";

import importAll from "@/utils/importAll";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const gap = 8;

const images = importAll(
  require.context("/public/media", false, /\.(png|jpe?g|svg)$/),
) as Array<StaticRequire>;

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry>(null);
  const sizerRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>();
  const [expandedSrc, setExpandedSrc] = useState<string>();

  useEffect(() => {
    (async () => {
      const Masonry = (await import("masonry-layout")).default;
      masonryRef.current = new Masonry(containerRef.current ?? "", {
        itemSelector: ".item",
        columnWidth: ".item-width",
        gutter: gap,
        resize: false,
      });
    })();
  }, []);

  useLayoutEffect(() => {
    const getwidth = () => {
      setWidth(sizerRef.current?.offsetWidth);
    };
    getwidth();
    window.addEventListener("resize", getwidth);
    return () => window.removeEventListener("resize", getwidth);
  }, []);

  useLayoutEffect(() => {
    masonryRef.current?.layout?.();
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="grid w-full grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] 2xl:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))]"
      style={{ gap }}
    >
      <div ref={sizerRef} className="item-width" />
      {images.map((image) => (
        <Item
          key={image.default.src}
          image={image}
          width={width}
          masonry={masonryRef}
          expanded={expandedSrc === image.default.src}
          onClick={() =>
            setExpandedSrc((currExpandedSrc) =>
              currExpandedSrc === image.default.src
                ? undefined
                : image.default.src,
            )
          }
        />
      ))}
    </div>
  );
}

interface ItemProps {
  image: StaticRequire;
  width?: number;
  masonry?: RefObject<Masonry | null>;
  expanded?: boolean;
  onClick?: () => void;
}

function Item({
  image,
  width: initialWidth = NaN,
  masonry,
  expanded,
  onClick,
}: ItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const width = useMemo(
    () => (expanded ? initialWidth * 2 + gap : initialWidth),
    [expanded, initialWidth],
  );

  const aspectRatio = useMemo(
    () => image.default.width / image.default.height,
    [image],
  );

  useLayoutEffect(() => {
    masonry?.current?.layout?.();
  }, [expanded, masonry]);

  return (
    <div
      ref={ref}
      className="item group/image relative max-w-full cursor-pointer"
      style={{ width, aspectRatio, marginBottom: gap }}
      onClick={onClick}
    >
      <Image
        src={image}
        width={initialWidth * 2 + gap || 800}
        height={800}
        alt=""
        quality={90}
        className="transition-all"
        style={{ width }}
      />
    </div>
  );
}
