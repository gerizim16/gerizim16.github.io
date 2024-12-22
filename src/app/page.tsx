import Gallery from "./components/Gallery";
import NavBar from "./components/Navbar";

export default function Home() {
  return (
    <div className="relative flex w-full flex-col items-start p-6 lg:flex-row">
      <NavBar />
      <Gallery />
    </div>
  );
}
