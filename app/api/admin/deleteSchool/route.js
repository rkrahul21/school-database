import { NextResponse } from "next/server";
import connectDb from "@/app/lib/connectDb";

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });
  try {
    await connectDb.query(`DELETE FROM schools WHERE id=?`, [id]);
    return NextResponse.json({ message: "School deleted" });
  } catch (err) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
