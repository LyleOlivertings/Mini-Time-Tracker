type TimeEntry = {
  hoursWorked: number;
};

export default function TotalHours({ entries }: { entries: TimeEntry[] }) {
  const total = entries.reduce((sum, e) => sum + e.hoursWorked, 0);
  return <p className="mt-4 font-bold">Total Hours: {total}</p>;
}
