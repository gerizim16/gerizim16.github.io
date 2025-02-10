import NavBar from "../components/Navbar";
import "../globals.css";

export default function WithShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate flex flex-col lg:flex-row">
      <NavBar className="z-10 w-full self-start p-2 lg:w-min" />
      <main className="relative grow p-2">{children}</main>
    </div>
  );
}
