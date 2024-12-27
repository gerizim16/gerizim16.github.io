import importAll from "@/utils/importAll";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { notFound } from "next/navigation";

const images = importAll(
  require.context("/public/media", false, /\.(png|jpe?g|svg)$/),
) as Array<StaticRequire>;

interface ViewerProps {
  params: Promise<{ src: string }>;
}

export default async function Viewer({ params }: ViewerProps) {
  const { src: encodedSrc } = await params;

  const image = images.find(
    ({ default: { src } }) => src === decodeURIComponent(encodedSrc),
  );

  if (!image) notFound();

  const {
    default: { src, width, height, blurDataURL },
  } = image;

  return (
    <div className="h-[calc(100vh_-_16px)]">
      <Image
        src={src}
        width={width}
        height={height}
        alt=""
        quality={100}
        placeholder="blur"
        blurDataURL={blurDataURL}
        className="absolute inset-0 m-auto max-h-full w-auto"
        priority
      />
    </div>
  );
}

export async function generateStaticParams() {
  return images.map(({ default: { src } }) => ({ src }));
}
