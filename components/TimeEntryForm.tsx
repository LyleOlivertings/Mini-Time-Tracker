"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type TimeEntry = {
  _id?: string;
  taskName: string;
  hoursWorked: number;
};

interface TimeEntryFormProps {
  onAdd: () => void;
  editEntry?: TimeEntry | null;
  onEditDone?: () => void;
  timerActive: boolean;
  timerElapsed: number;
  onTimerStart: () => void;
  onTimerStop: () => void;
  onTimerReset: () => void;
}

export default function TimeEntryForm({
  onAdd,
  editEntry,
  onEditDone,
  timerActive,
  timerElapsed,
  onTimerStart,
  onTimerStop,
  onTimerReset,
}: TimeEntryFormProps) {
  const [taskName, setTaskName] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);

  // Timer state is now managed by parent

  useEffect(() => {
    if (editEntry) {
      setTaskName(editEntry.taskName);
      setHoursWorked(editEntry.hoursWorked);
      // Reset timer state in parent if needed
    } else {
      setTaskName("");
      setHoursWorked(0);
      // Reset timer state in parent if needed
    }
  }, [editEntry]);

  // When timer stops, set hoursWorked based on elapsed time
  useEffect(() => {
    if (!timerActive && timerElapsed > 0) {
      const hours = Math.round((timerElapsed / 3600000) * 100) / 100;
      setHoursWorked(hours);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive, timerElapsed]);

  // (No custom toast logic needed)

  const formatElapsed = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) {
      toast.error("Task name cannot be blank.", { id: "form-error" });
      return;
    }
    if (hoursWorked <= 0) {
      toast.error("Hours worked must be greater than 0.", { id: "form-error" });
      return;
    }

    if (editEntry && editEntry._id) {
      await fetch(`/api/time/${editEntry._id}`, {
        method: "PUT",
        body: JSON.stringify({ taskName, hoursWorked }),
        headers: { "Content-Type": "application/json" },
      });
      if (onEditDone) onEditDone();
    } else {
      await fetch("/api/time", {
        method: "POST",
        body: JSON.stringify({ taskName, hoursWorked }),
        headers: { "Content-Type": "application/json" },
      });
      onAdd();
    }
    setTaskName("");
    setHoursWorked(0);
    onTimerReset();
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full"
        />
        <input
          type="number"
          placeholder="Hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex flex-row items-center gap-4 mb-6">
          <button type="submit">
            {editEntry ? "Update Entry" : "Add Entry"}
          </button>
          {editEntry && onEditDone && (
            <button
              type="button"
              onClick={onEditDone}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
        {/* Timer controls removed from form */}
      </form>
    </div>
  );
}
