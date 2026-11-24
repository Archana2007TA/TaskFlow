# TaskFlow — Smart To-Do List & Task Manager

TaskFlow is a modern, responsive To-Do List web application built with React, Vite, Tailwind CSS, and Lucide React. It helps users organize daily tasks efficiently with full CRUD operations, priority levels, categories, due dates, progress tracking, light/dark themes, and persistent LocalStorage storage.

## Features

- **Full CRUD Operations**:
  - **Create**: Add tasks with title, description, due date, priority (`Low`, `Medium`, `High`), and category (`Personal`, `College`, `Work`, `Other`).
  - **Read**: View pending and completed tasks in separate sections with live search and instant filtering.
  - **Update**: Edit task details or toggle completion status with one click.
  - **Delete**: Remove individual tasks with a confirmation dialog, or clear all completed tasks at once.
- **Smart Filtering & Sorting**:
  - Filter by status (`All`, `Pending`, `Completed`), category (`Personal`, `College`, `Work`, `Other`), and priority (`High`, `Medium`, `Low`).
  - Sort tasks by due date (earliest/latest), priority (high-to-low / low-to-high), or newest created.
- **Dashboard Metrics & Progress**:
  - Real-time summary cards for Total, Pending, and Completed tasks.
  - Visual completion progress bar with percentage and count tracking.
- **Responsive Design & UX**:
  - Desktop sidebar navigation and mobile/tablet slide-over drawer.
  - Persistent Light and Dark mode toggle.
  - Toast notifications for task creation, updates, completion toggles, and deletions.
  - Empty-state illustration with quick recovery actions.
- **Offline Persistence**:
  - All tasks and theme preferences are automatically saved to browser `localStorage`.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage`

## Project Structure

```text
├── public/
├── src/
│   ├── assets/
│   │   └── images/           # Generated empty-state illustration
│   ├── components/           # Reusable UI components (Sidebar, Header, TaskCard, Modals, etc.)
│   ├── hooks/                # Custom React hooks (useTasks, useTheme, useToast)
│   ├── types/                # TypeScript interfaces and constants
│   ├── utils/                # LocalStorage & task filtering/sorting helpers
│   ├── App.tsx               # Main dashboard application
│   ├── index.css             # Tailwind CSS v4 setup & dark mode variant
│   └── main.tsx              # Application entry point
├── index.html
├── package.json
├── vercel.json               # Vercel SPA rewrite configuration
└── vite.config.ts
```

## Getting Started Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/taskflow.git
   cd taskflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000`.

4. **Build for production**
   ```bash
   npm run build
   ```
   Preview the production build locally with:
   ```bash
   npm run preview
   ```

## Uploading to GitHub

```bash
git init
git add .
git commit -m "Initial commit: TaskFlow Smart To-Do List application"
git branch -M main
git remote add origin https://github.com/<your-username>/taskflow.git
git push -u origin main
```

## Deploying to Vercel

1. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```
2. **Via Vercel Dashboard**:
   - Push your repository to GitHub.
   - Go to [vercel.com](https://vercel.com) and click **Add New Project**.
   - Import your `taskflow` GitHub repository.
   - Vercel automatically detects **Vite** (`npm run build` / output directory `dist`).
   - Click **Deploy**.
