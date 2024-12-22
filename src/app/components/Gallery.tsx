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

  const [maxWidth, setMaxWidth] = useState(
    containerRef.current?.clientWidth ?? NaN,
  );
  const [maxHeight, setMaxHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState<number | undefined>(
    sizerRef.current?.offsetWidth,
  );
  const [expandedSrc, setExpandedSrc] = useState<string>();

  useEffect(() => {
    (async () => {
      const Masonry = (await import("masonry-layout")).default;
      masonryRef.current = new Masonry(containerRef.current ?? "", {
        itemSelector: ".item",
        columnWidth: ".item-width",
        gutter: gap,
        resize: false,
        transitionDuration: "0.3s",
      });
    })();
  }, []);

  useLayoutEffect(() => {
    const getMeasurements = () => {
      setMaxWidth(containerRef.current?.clientWidth ?? NaN);
      setMaxHeight(window.innerHeight);
      setWidth(sizerRef.current?.offsetWidth);
    };
    getMeasurements();
    window.addEventListener("resize", getMeasurements);
    return () => window.removeEventListener("resize", getMeasurements);
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
          maxWidth={maxWidth - gap * 2}
          maxHeight={maxHeight - gap * 2}
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
  maxWidth?: number;
  maxHeight?: number;
  width?: number;
  masonry?: RefObject<Masonry | null>;
  expanded?: boolean;
  onClick?: () => void;
}

function Item({
  image,
  maxWidth,
  maxHeight,
  width: initialWidth,
  masonry,
  expanded,
  onClick,
}: ItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const aspectRatio = useMemo(
    () => image.default.width / image.default.height,
    [image],
  );

  const expandedWidth = useMemo(() => {
    if (!maxWidth || !maxHeight) return "auto";
    if (maxWidth / aspectRatio > maxHeight) {
      return maxHeight * aspectRatio;
    } else {
      return "100%";
    }
  }, [aspectRatio, maxHeight, maxWidth]);

  const width = useMemo(
    () => (expanded ? expandedWidth : initialWidth),
    [expanded, expandedWidth, initialWidth],
  );

  useLayoutEffect(() => {
    masonry?.current?.layout?.();
    masonry?.current?.once?.("layoutComplete", () =>
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: expanded ? "center" : "nearest",
      }),
    );
  }, [expanded, masonry]);

  return (
    <div
      ref={ref}
      className="item group/image relative max-w-full cursor-pointer"
      style={{ width, aspectRatio, marginBottom: gap }}
      onClick={() => {
        onClick?.();
      }}
    >
      <Image
        src={image}
        width={expanded ? maxWidth : initialWidth}
        alt=""
        quality={90}
        placeholder="blur"
        className="transition-all"
        style={{ width }}
      />
    </div>
  );
}
