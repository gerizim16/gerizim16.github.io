"use client";

import YesSticker from "@public/stickers/mobile-girl-blush.gif";
import Image from "next/image";

export default function Valentine() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white p-4">
      <div className="relative h-56 w-full">
        <Image
          className="object-contain"
          fill
          src={YesSticker}
          alt="sad mobile girl mim sticker"
        />
      </div>
      <div className="text-center text-3xl">Mehehehe {":>"}</div>
      <p>luv u!</p>
      <div className="text-center">
        <p className="mb-4">See you on Feb 14, 9AM @ my place.</p>
        <p>
          Wear something that can
          <br />
          match your black speedcat.
        </p>
        <p className="text-xs">Ako na magbook ng grab mo.</p>
      </div>
    </div>
  );
}
