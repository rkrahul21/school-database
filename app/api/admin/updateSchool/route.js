import { NextResponse } from "next/server";
import connectDb from "@/app/lib/connectDb";

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });
  const data = await req.json();
  try {
    await connectDb.query(
      `UPDATE schools SET name=?, address=?, city=?, state=?, contact=?, email_id=? WHERE id=?`,
      [data.name, data.address, data.city, data.state, data.contact, data.email_id, id]
    );
    return NextResponse.json({ message: "School updated" });
  } catch (err) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
