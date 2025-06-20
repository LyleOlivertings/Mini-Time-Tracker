import React from "react";

interface TimerDisplayProps {
  elapsed: number;
  active: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

function formatElapsed(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}


const TimerDisplay: React.FC<TimerDisplayProps> = ({
  elapsed,
  active,
  onStart,
  onStop,
  onReset,
}) => {
  // Render: always show the card
  return (
    <div
      className="fixed z-50 bottom-8 right-8"
      style={{
        minWidth: 220,
        background: "var(--color-bg-secondary)",
        color: "var(--color-accent)",
        borderRadius: "16px",
        boxShadow: "0 4px 24px rgba(79,140,255,0.18)",
        padding: "1.5em 2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "2rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        border: "2px solid var(--color-accent)",
        userSelect: "none",
        transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
      }}
    >
      <span
        style={{
          fontSize: "1rem",
          color: "var(--color-text-secondary)",
          marginBottom: 8,
          width: "100%",
          userSelect: "none",
        }}
      >
        Timer
      </span>
      <span>{formatElapsed(elapsed)}</span>
      <div className="flex flex-col gap-2 mt-4" style={{ width: "100%" }}>
        {!active && elapsed === 0 && (
          <button
            onClick={onStart}
            className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded shadow transition"
            style={{ minWidth: 110, fontSize: "1rem" }}
          >
            Start Timer
          </button>
        )}
        {active && (
          <button
            onClick={onStop}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-5 py-2 rounded shadow transition"
            style={{ minWidth: 110, fontSize: "1rem" }}
          >
            Stop Timer
          </button>
        )}
        {(active || elapsed > 0) && (
          <button
            onClick={onReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded shadow transition"
            style={{ minWidth: 110, fontSize: "1rem" }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default TimerDisplay;
