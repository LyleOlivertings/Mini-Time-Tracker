// lib/models/TimeEntry.ts
import mongoose from "mongoose";

const TimeEntrySchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  hoursWorked: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.TimeEntry || mongoose.model("TimeEntry", TimeEntrySchema);
