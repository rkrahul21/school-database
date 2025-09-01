'use client'


import SchoolForm from "./components/SchoolForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] mt-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center font-sans">Add a School</h2>
        <SchoolForm />
      </div>
    </div>
  );
}
