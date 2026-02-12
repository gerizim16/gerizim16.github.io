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
        <p className="mb-4">See you on Feb 20 for our Elyu trip!</p>
        <p>
          I miss ü!
        </p>
        <p className="text-xs">(also, see u earlier than feb 20, hopefully!)</p>
      </div>
    </div>
  );
}
