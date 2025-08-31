'use client'

import "./globals.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-green-50 to-green-200 min-h-screen font-sans">
        <Navbar />
        <main className="w-full  ">
          {children}
        </main>
      </body>
    </html>
  );
}
