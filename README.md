# Looped Mini Time Tracker

A modern, full-stack time tracking app built with Next.js, MongoDB, and TypeScript. Track your work sessions, manage time entries, and use a built-in timer—all with a clean, responsive UI and instant feedback.

---

## Features

### Timer
- **Fixed Timer Card:** Always visible in the bottom-right corner for quick access.
- **Start, Stop, Reset:** Easily control your work timer.
- **Accurate Time Tracking:** Timer counts in real time and displays elapsed time in hours, minutes, and seconds.
- **Auto-fill Hours:** When you stop the timer, the elapsed time is automatically filled into the entry form.

### Time Entry Management
- **Add Entry:** Log new work sessions with a task name and hours worked.
- **Edit Entry:** Update existing entries directly from the list.
- **Delete Entry:** Remove entries you no longer need.
- **List View:** See all your time entries in a clean, scrollable list.

### User Experience
- **Instant Feedback:** All actions (add, edit, delete) update the UI immediately.
- **Validation:** Prevents blank task names and zero/negative hours, with clear error messages.
- **Error Notifications:** Uses [react-hot-toast](https://react-hot-toast.com/) for dismissible, accessible error toasts.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Accessible Controls:** Buttons and forms are keyboard-friendly and screen reader accessible.

### Backend & API
- **MongoDB Integration:** All time entries are stored in a MongoDB database.
- **RESTful API:** 
  - `GET /api/time` — List all time entries
  - `POST /api/time` — Add a new time entry
  - `GET /api/time/[id]` — Get a single time entry by ID
  - `PUT /api/time/[id]` — Update a time entry by ID
  - `DELETE /api/time/[id]` — Delete a time entry by ID
- **Robust Error Handling:** API returns clear error messages for invalid requests or database issues.

### Technology
- **Next.js App Router:** Modern file-based routing and API endpoints.
- **TypeScript:** Type-safe codebase for both frontend and backend.
- **react-hot-toast:** For beautiful, non-blocking notifications.
- **Geist Font:** Clean, modern typography.

---


---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

- **Timer:** Use the timer card in the bottom-right to track your work. Start, stop, and reset as needed.
- **Add Entry:** Fill out the form to add a new time entry. Validation errors are shown as toast notifications.
- **Edit Entry:** Click an entry to edit it. Updates are sent to the backend via the `/api/time/[id]` endpoint.
- **Delete Entry:** Remove entries with a single click.
- **Error Handling:** All validation and server errors are displayed using react-hot-toast.

---

## API Endpoints

- `GET /api/time` — List all time entries
- `POST /api/time` — Add a new time entry
- `GET /api/time/[id]` — Get a single time entry by ID
- `PUT /api/time/[id]` — Update a time entry by ID
- `DELETE /api/time/[id]` — Delete a time entry by ID

---

## Tech Stack

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [Geist Font](https://vercel.com/font)

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)
