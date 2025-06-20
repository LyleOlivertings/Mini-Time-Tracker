type TimeEntry = {
  _id: string;
  taskName: string;
  hoursWorked: number;
};

interface TimeEntryListProps {
  entries: TimeEntry[];
  onDelete?: (id: string) => void;
  onEdit?: (entry: TimeEntry) => void;
}

export default function TimeEntryList({ entries, onDelete, onEdit }: TimeEntryListProps) {
  return (
    <ul className="space-y-2 mt-6">
      {entries.map((entry) => (
        <li key={entry._id} className="border p-3 rounded shadow flex items-center justify-between gap-2">
          <div>
            <strong>{entry.taskName}</strong> — {entry.hoursWorked} hrs
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <button
                className="text-sm px-3 py-1 rounded bg-blue-700 text-white hover:bg-blue-500"
                onClick={() => onEdit(entry)}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                className="text-sm px-3 py-1 rounded bg-red-600 text-white hover:bg-red-400"
                onClick={() => onDelete(entry._id)}
              >
                Delete
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
