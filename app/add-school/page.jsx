'use client'

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Page() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitStatus, setSubmitStatus] = useState("");
  const [imageError, setImageError] = useState("");

  const onSubmit = async (data) => {
    setImageError("");
    const imageFile = data.image && data.image[0];
    if (imageFile && imageFile.size > 1024 * 1024) {
      setImageError("Image size should not exceed 1MB");
      return;
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        formData.append(key, value[0]);
      } else {
        formData.append(key, value);
      }
    });
    setSubmitStatus("");
    try {
      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitStatus("School added successfully!");
        reset();
      } else {
        setSubmitStatus("Failed to add school.");
      }
    } catch (err) {
      setSubmitStatus("Error occurred.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="max-w-md mx-auto p-4 border rounded bg-white shadow">
        <h2 className="text-xl font-bold mb-4">Add School</h2>
        <div className="mb-2">
          <label>School Name:</label>
          <input {...register("name", { required: "Name is required" })} className="border p-1 w-full" />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}
        </div>
        <div className="mb-2">
          <label>Address:</label>
          <input {...register("address", { required: "Address is required" })} className="border p-1 w-full" />
          {errors.address && <span className="text-red-500">{errors.address.message}</span>}
        </div>
        <div className="mb-2">
          <label>City:</label>
          <input {...register("city", { required: "City is required" })} className="border p-1 w-full" />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </div>
        <div className="mb-2">
          <label>State:</label>
          <input {...register("state", { required: "State is required" })} className="border p-1 w-full" />
          {errors.state && <span className="text-red-500">{errors.state.message}</span>}
        </div>
        <div className="mb-2">
          <label>Contact:</label>
          <input type="number" {...register("contact", { required: "Contact is required", minLength: { value: 10, message: "Contact must be at least 10 digits" } })} className="border p-1 w-full" />
          {errors.contact && <span className="text-red-500">{errors.contact.message}</span>}
        </div>
        <div className="mb-2">
          <label>Email:</label>
          <input type="email" {...register("email_id", { required: "Email is required", pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" } })} className="border p-1 w-full" />
          {errors.email_id && <span className="text-red-500">{errors.email_id.message}</span>}
        </div>
        <div className="mb-2">
          <label>Image:</label>
          <input type="file" accept="image/*" {...register("image", { required: "Image is required" })} className="border p-1 w-full" />
          {errors.image && <span className="text-red-500">{errors.image.message}</span>}
          {imageError && <span className="text-red-500">{imageError}</span>}
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded text-center">Submit</button>
        {submitStatus && <div className="mt-2 text-center">{submitStatus}</div>}
      </form>
    </div>
  );
}
