"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="bg-gray-900 py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-white tracking-wide font-sans">School Search</h1>
      <div className=" flex gap-4 mx-2">
        {pathname === "/show-school" ? (
          <Link href="/">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition-all duration-200">Home</button>
          </Link>
        ) : pathname === "/" ? (
          <Link href="/show-school">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition-all duration-200">Show All</button>
          </Link>
        ) : null}

        <Link href="/admin">
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded transition-all duration-200  ">Admin</button>
          </Link>
      </div>
    </nav>
  );
}
