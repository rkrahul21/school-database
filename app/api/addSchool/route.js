import { NextResponse } from "next/server";
import connectDb from "@/app/lib/connectDb";
import { uploadToS3 } from "@/app/lib/s3Upload";

async function ensureSchoolsTable() {
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
}

export async function POST(req) {
  try {
    // Ensure table exists before inserting
    await ensureSchoolsTable();
    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    if (!name || !address || !city || !state || !contact || !email_id || !imageFile) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json({ message: "Invalid email address." }, { status: 400 });
    }

    // Upload image to AWS S3
    const buffer = Buffer.from(await imageFile.arrayBuffer());
  const imageName = Date.now() + "_" + imageFile.name.replace(/\s+/g, "_");
  const imageUrl = await uploadToS3({ buffer, fileName: imageName });
    console.log("Image uploaded to S3:", imageUrl);
    const [result] = await connectDb.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imageUrl, email_id]
    );

    return NextResponse.json({ message: "School added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
