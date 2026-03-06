import Sidebar from "./components/sidebar";
import TaskBoard from "./components/task-board";

export default function Home() {
  return (
    <main className="flex h-screen px-5 py-5 gap-6 items-start justify-start bg-neutral-50 font-sans dark:bg-neutral-900 overflow-hidden">
      <Sidebar />
      <TaskBoard />
    </main>
  );
}
