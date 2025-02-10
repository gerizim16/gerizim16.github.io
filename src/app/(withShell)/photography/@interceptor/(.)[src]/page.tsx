import importAll from "@/utils/importAll";
import { StaticRequire } from "next/dist/shared/lib/get-img-props";

export default function Null() {
  return <></>;
}

const images = importAll(
  require.context("/public/media", false, /\.(png|jpe?g|svg)$/),
) as Array<StaticRequire>;

export async function generateStaticParams() {
  return images.map(({ default: { src } }) => ({ src }));
}
