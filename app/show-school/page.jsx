'use client'

import React, { useEffect, useState } from 'react';

function Page() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/api/getSchool')
      .then((res) => res.json())
      .then((data) => setSchools(data.schools || []));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Schools</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {schools.map((school) => (
          <div key={school.id} className="border rounded shadow p-4">
            <img
              src={school.image ? `/schoolImages/${school.image}` : '/next.svg'}
              alt={school.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{school.name}</h3>
            <p className="text-sm text-gray-600">{school.address}</p>
            <p className="text-sm text-gray-600">{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;