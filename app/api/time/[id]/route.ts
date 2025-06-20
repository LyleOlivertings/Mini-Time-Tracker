import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TimeEntry from "@/lib/models/TimeEntry";

// Update, Delete, or Get a time entry by ID
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  const data = await req.json();
  try {
    const updated = await TimeEntry.findByIdAndUpdate(id, data, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  try {
    const deleted = await TimeEntry.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;
  try {
    const entry = await TimeEntry.findById(id);
    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(entry);
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
