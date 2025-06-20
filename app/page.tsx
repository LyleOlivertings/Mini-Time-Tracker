"use client";

import TimeEntryForm from "@/components/TimeEntryForm";
import TimeEntryList from "@/components/TimeEntryList";
import TotalHours from "@/components/TotalHours";
import TimerDisplay from "@/components/TimerDisplay";
import { useEffect, useState } from "react";
import { FiClock } from "react-icons/fi";

type TimeEntry = {
  _id: string;
  taskName: string;
  hoursWorked: number;
};

export default function HomePage() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [editEntry, setEditEntry] = useState<TimeEntry | null>(null);

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerStart, setTimerStart] = useState<number | null>(null);
  const [timerElapsed, setTimerElapsed] = useState(0);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timerActive && timerStart !== null) {
      interval = setInterval(() => {
        setTimerElapsed(Date.now() - timerStart);
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timerStart]);

  const handleTimerStart = () => {
    setTimerActive(true);
    setTimerStart(Date.now());
    setTimerElapsed(0);
  };

  const handleTimerStop = () => {
    if (timerStart !== null) {
      setTimerActive(false);
      setTimerElapsed(Date.now() - timerStart);
      setTimerStart(null);
    }
  };

  const handleTimerReset = () => {
    setTimerActive(false);
    setTimerStart(null);
    setTimerElapsed(0);
  };

  const fetchEntries = async () => {
    const res = await fetch("/api/time");
    const data = await res.json();
    setEntries(data);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/time/${id}`, { method: "DELETE" });
    fetchEntries();
  };

  const handleEdit = (entry: TimeEntry) => {
    setEditEntry(entry);
  };

  const handleEditDone = () => {
    setEditEntry(null);
    fetchEntries();
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiClock className="inline-block" size={28} /> Time Tracker
      </h1>
      <TimeEntryForm
        onAdd={fetchEntries}
        editEntry={editEntry}
        onEditDone={handleEditDone}
        timerActive={timerActive}
        timerElapsed={timerElapsed}
        onTimerStart={handleTimerStart}
        onTimerStop={handleTimerStop}
        onTimerReset={handleTimerReset}
      />
      <TimeEntryList
        entries={entries}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <TotalHours entries={entries} />
      <TimerDisplay
        elapsed={timerElapsed}
        active={timerActive || timerElapsed > 0}
        onStart={handleTimerStart}
        onStop={handleTimerStop}
        onReset={handleTimerReset}
      />
    </main>
  );
}
