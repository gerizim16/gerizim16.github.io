'use client';
import { Masonry } from 'masonic';
import Image from 'next/image';

interface GalleryProps {
  images: Array<ImageCardProps['data']>;
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <Masonry
      items={images}
      render={ImageCard}
      columnWidth={300}
      columnGutter={12}
    />
  );
}

interface ImageCardProps {
  data: { src: string };
}

function ImageCard({ data: { src } }: ImageCardProps) {
  return (
    <Image
      src={src}
      alt=""
      width={400}
      height={0}
      quality={100}
      // placeholder="blur"
      className="w-full h-auto"
    />
  );
}
