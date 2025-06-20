import { connectDB } from "@/lib/mongodb";
import TimeEntry from "@/lib/models/TimeEntry";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const entries = await TimeEntry.find().sort({ createdAt: -1 });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const { taskName, hoursWorked } = await req.json();
  if (!taskName || hoursWorked <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  await connectDB();
  const entry = await TimeEntry.create({ taskName, hoursWorked });
  return NextResponse.json(entry);
}
