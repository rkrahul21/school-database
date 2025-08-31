import { NextResponse } from "next/server";
import connectDb from "@/app/lib/connectDb";

// GET all schools
export async function GET() {
  try {
    // Ensure table exists (optional, for safety)
    await connectDb.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT,
        address TEXT,
        city TEXT,
        state TEXT,
        contact BIGINT,
        image TEXT,
        email_id TEXT
      )
    `);

    const [rows] = await connectDb.query("SELECT * FROM schools");
    return NextResponse.json({ schools: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
