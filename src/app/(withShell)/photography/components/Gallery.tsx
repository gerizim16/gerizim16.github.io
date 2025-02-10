"use client";

import type Masonry from "masonry-layout";

import { links } from "@/app/components/Navbar";
import useTheme from "@/store/useTheme";
import importAll from "@/utils/importAll";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  KeyboardEventHandler,
  Ref,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

const gap = 8;
const transitionDuration = "0.3s";

const images = importAll(
  require.context("/public/media", false, /\.(png|jpe?g|svg)$/),
) as Array<StaticRequire>;

export default function Gallery() {
  const { refresh } = useRouter();
  const pathname = usePathname();
  const params = useParams<{ src?: string }>();

  const setDim = useTheme.use.setDim();

  const expanded = useMemo(
    () => ({
      src: params.src ? decodeURIComponent(params.src) : undefined,
      isExpanded: !!params.src && pathname.endsWith(params.src),
    }),
    [params.src, pathname],
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry>(null);
  const sizerRef = useRef<HTMLDivElement>(null);

  const itemsRef = useRef<Map<string, HTMLElement | null>>(new Map());

  const [maxWidth, setMaxWidth] = useState(
    containerRef.current?.clientWidth ?? NaN,
  );
  const [maxHeight, setMaxHeight] = useState(NaN);
  const [width, setWidth] = useState<number | undefined>(
    sizerRef.current?.offsetWidth,
  );
  useLayoutEffect(() => {
    (async () => {
      const Masonry = (await import("masonry-layout")).default;
      masonryRef.current = new Masonry(containerRef.current ?? "", {
        itemSelector: ".item",
        columnWidth: ".item-width",
        gutter: gap,
        resize: false,
        transitionDuration,
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
  }, [width, expanded]);

  useLayoutEffect(() => {
    masonryRef?.current?.once?.("layoutComplete", () => {
      itemsRef.current.get(expanded.src ?? "")?.scrollIntoView({
        behavior: "smooth",
        block: expanded.isExpanded ? "center" : "nearest",
      });
    });
  }, [expanded]);

  useEffect(() => {
    setDim(expanded.isExpanded);
  }, [expanded.isExpanded, setDim]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div
      ref={containerRef}
      className="relative grid w-full grid-cols-[repeat(auto-fill,_minmax(min(100%/3,_300px),_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(400px,_1fr))] 2xl:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))]"
      style={{ gap }}
    >
      <div ref={sizerRef} className="item-width" />
      {images.map((image) => {
        const isExpanded =
          expanded.isExpanded && expanded.src === image.default.src;

        return (
          <Link
            href={
              isExpanded
                ? links.Photography
                : `${links.Photography}/${encodeURIComponent(image.default.src)}`
            }
            key={image.default.src}
            scroll={false}
            className="item"
          >
            <Item
              ref={(e) => {
                itemsRef.current.set(image.default.src, e);
              }}
              key={image.default.src}
              image={image}
              maxWidth={maxWidth}
              maxHeight={maxHeight - gap * 2}
              className={twMerge(
                "bg-white after:absolute after:inset-0 after:bg-black after:bg-opacity-0 after:transition-all hover:after:opacity-0",
                expanded.isExpanded &&
                  (expanded.src === image.default.src
                    ? "p-4 sm:p-8"
                    : "after:bg-opacity-90"),
              )}
              width={width}
              masonry={masonryRef}
              expanded={isExpanded}
            />
          </Link>
        );
      })}
    </div>
  );
}

interface ItemProps {
  ref?: Ref<HTMLDivElement>;
  image: StaticRequire;
  maxWidth?: number;
  maxHeight?: number;
  className?: HTMLElement["className"];
  width?: number;
  masonry?: RefObject<Masonry | null>;
  expanded: boolean;
}

function Item({
  ref,
  image,
  maxWidth,
  maxHeight,
  className,
  width: initialWidth,
  masonry,
  expanded,
}: ItemProps) {
  const { push } = useRouter();

  const [internalWidth, setInternalWidth] = useState(initialWidth);

  const aspectRatio = useMemo(
    () => image.default.width / image.default.height,
    [image],
  );

  const expandedWidth = useMemo(() => {
    if (!maxWidth || !maxHeight) return undefined;
    if (maxWidth / aspectRatio > maxHeight) {
      return maxHeight * aspectRatio;
    } else {
      return maxWidth;
    }
  }, [aspectRatio, maxHeight, maxWidth]);

  const width = useMemo(
    () => (expanded ? expandedWidth : initialWidth),
    [expanded, expandedWidth, initialWidth],
  );

  const height = width ? width / aspectRatio : undefined;

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (expanded && e.key === "Escape") push(links.Photography);
    },
    [expanded, push],
  );

  useLayoutEffect(() => {
    masonry?.current?.once?.("layoutComplete", () => {
      if (expanded) setInternalWidth(expandedWidth);
    });
  }, [expanded, expandedWidth, masonry]);

  return (
    <div
      ref={ref}
      className="relative cursor-pointer"
      style={{
        width,
        height,
        marginBottom: gap,
      }}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      <div
        className={twMerge("relative transition-all", className)}
        style={{
          width,
          height,
          transitionDuration,
        }}
      >
        {initialWidth && (
          <Image
            src={image}
            width={internalWidth ?? initialWidth}
            alt=""
            quality={90}
            placeholder="blur"
            className="size-full"
            priority={expanded}
          />
        )}
      </div>
    </div>
  );
}
