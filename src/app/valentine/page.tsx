"use client";

import NoSticker from "@public/stickers/cat-pet.gif";
import DefaultSticker from "@public/stickers/mim-love.gif";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const yesMessages = [
  "Yes",
  "Yes, honey",
  "Of course, my love",
  "Geri, I love you",
  "Kulet, yes lang pwede.",
];

export default function Valentine() {
  const [noCount, setNoCount] = useState(0);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-white p-4">
      <div className="relative h-56 w-full">
        <Image
          className="object-contain"
          fill
          src={noCount ? NoSticker : DefaultSticker}
          alt="sad mobile girl mim sticker"
        />
      </div>
      <div className="text-center text-3xl">
        Cristin, will you be my Valentine?
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/valentine/yes"
          style={{ fontSize: `${1 + noCount * 0.3}rem` }}
          className="rounded bg-green-500 px-2 py-1 font-bold text-white"
        >
          {yesMessages.at(noCount) ?? `Yes${"!".repeat(noCount)}`}
        </Link>
        <button
          className="rounded bg-red-500 px-2 py-1 font-bold text-white"
          style={{ fontSize: `${1 - noCount * 0.1}rem` }}
          onClick={() => setNoCount((c) => c + 1)}
        >
          No
        </button>
      </div>
    </div>
  );
}
