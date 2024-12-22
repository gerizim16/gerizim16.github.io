"use client";
import StickyBox from "react-sticky-box";

export default function NavBar() {
  return (
    <StickyBox offsetTop={24}>
      <h1 className="xl:text-4xl text-2xl lg:text-3xl">Gerizim Villarante</h1>
    </StickyBox>
  );
}
