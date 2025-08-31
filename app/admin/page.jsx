"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [schools, setSchools] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    const res = await fetch("/api/getSchool");
    const data = await res.json();
    setSchools(data.schools || []);
  };

  const handleEdit = (school) => {
    setEditId(school.id);
    setEditData({ ...school });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    setStatus("");
    const res = await fetch(`/api/admin/updateSchool?id=${id}` , {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      setStatus("Updated successfully");
      setEditId(null);
      fetchSchools();
    } else {
      setStatus("Update failed");
    }
  };

  const handleDelete = async (id) => {
    setStatus("");
    const res = await fetch(`/api/admin/deleteSchool?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setStatus("Deleted successfully");
      fetchSchools();
    } else {
      setStatus("Delete failed");
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Admin: Manage Schools</h1>
      {status && <div className="mb-4 text-center text-green-700 font-semibold">{status}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-green-100">
              <th className="py-2 px-3 border">ID</th>
              <th className="py-2 px-3 border">Name</th>
              <th className="py-2 px-3 border">Address</th>
              <th className="py-2 px-3 border">City</th>
              <th className="py-2 px-3 border">State</th>
              <th className="py-2 px-3 border">Contact</th>
              <th className="py-2 px-3 border">Email</th>
              <th className="py-2 px-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school) => (
              <tr key={school.id} className="text-center">
                <td className="border px-2 py-1">{school.id}</td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="name" value={editData.name} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.name
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="address" value={editData.address} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.address
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="city" value={editData.city} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.city
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="state" value={editData.state} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.state
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="contact" value={editData.contact} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.contact
                  )}
                </td>
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <input name="email_id" value={editData.email_id} onChange={handleEditChange} className="border p-1 w-full" />
                  ) : (
                    school.email_id
                  )}
                </td>
                
                <td className="border px-2 py-1">
                  {editId === school.id ? (
                    <>
                      <button className="bg-green-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleUpdate(school.id)}>Save</button>
                      <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="bg-blue-600 text-white px-2 py-1 rounded mr-2" onClick={() => handleEdit(school)}>Edit</button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(school.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
