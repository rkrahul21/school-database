'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

function Page() {
  const [schools, setSchools] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/getSchool')
      .then((res) => res.json())
      .then((data) => setSchools(data.schools || []));
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[70vh] p-4">
      <div className="w-full  bg-white rounded-lg shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-green-700 mb-8 text-center font-sans">All Schools</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {schools.map((school) => (
            <div key={school.id} className="border rounded shadow p-4 bg-green-50 flex flex-col items-center">
              <img
                src={school.image ? `/schoolImages/${school.image}` : '/next.svg'}
                alt={school.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold text-green-800 mb-1">{school.name}</h3>
              <p className="text-sm text-gray-700 mb-1">{school.address}</p>
              <p className="text-sm text-gray-700 mb-1">{school.city}, {school.state}</p>
              <p className="text-sm text-gray-600">Contact: {school.contact}</p>
              <p className="text-sm text-gray-600">Email: {school.email_id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;