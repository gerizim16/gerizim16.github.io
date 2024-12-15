'use client';
import StickyBox from 'react-sticky-box';

export default function NavBar() {
  return (
    <StickyBox
      offsetTop={24}
      className="flex-none xl:w-[400px] lg:w-[300px] md:w-[250px] sm:w-[150px]"
    >
      <h1 className="xl:text-4xl md:text-2xl lg:text-3xl">
        Gerizim Villarante
      </h1>
      <div>sticky</div>
    </StickyBox>
  );
}
