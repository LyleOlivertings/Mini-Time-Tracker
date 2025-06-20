export default function TotalHours({ entries }: { entries: any[] }) {
  const total = entries.reduce((sum, e) => sum + e.hoursWorked, 0);
  return <p className="mt-4 font-bold">Total Hours: {total}</p>;
}
