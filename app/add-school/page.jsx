'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function page() {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    setMessage(result.message);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        <div>
          <input
            type="text"
            placeholder="School Name"
            {...register('name', { required: true })}
            className="w-full border rounded p-2"
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full border rounded p-2"
          />
          {errors.email && <span className="text-red-500">Valid email is required</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="City"
            {...register('city', { required: true })}
            className="w-full border rounded p-2"
          />
          {errors.city && <span className="text-red-500">City is required</span>}
        </div>

        <div>
          <textarea
            placeholder="Address"
            {...register('address', { required: true })}
            className="w-full border rounded p-2"
          ></textarea>
          {errors.address && <span className="text-red-500">Address is required</span>}
        </div>

        <div>
          <input
            type="file"
            {...register('image', { required: true })}
            accept="image/*"
            className="w-full"
          />
          {errors.image && <span className="text-red-500">Image is required</span>}
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  )
}

export default page