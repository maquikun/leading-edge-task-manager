import { LucideFolder, LucideLineChart, LucideListTodo } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
    return (
        <aside className="flex flex-col h-full min-w-fit md:min-w-xs gap-6 2xl:gap-10 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-200/70 dark:border-neutral-700/70 max-sm:hidden">
            <div className="flex flex-row gap-4 py-6 px-8 lg:gap-6 w-full items-center justify-start">
                <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt="Leading Edge logo"
                    width={40}
                    height={40}
                    priority
                />
                <h1 className="font-semibold text-lg 2xl:text-xl whitespace-nowrap">Task Manager</h1>
            </div>
            <nav>
                <ul className="flex flex-col gap-4 px-4">
                    <h2 className="text-sm font-bold px-4 dark:text-neutral-400">MAIN MENU</h2>
                    <li>
                        <button className="flex items-center py-2 px-4 gap-3 2xl:gap-4 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700 transition-colors cursor-pointer">
                            <span ><LucideListTodo className="w-5 2xl:w-6"/></span>
                            <span className="font-medium">All Tasks</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center py-2 px-4 gap-3 2xl:gap-4 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700 transition-colors cursor-pointer">
                            <span><LucideFolder  /></span>
                            <span className="font-medium">Projects</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center py-2 px-4 gap-3 2xl:gap-4 w-full text-left rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700 transition-colors cursor-pointer">
                            <span><LucideLineChart className="w-5 2xl:w-6" /></span>
                            <span className="font-medium">Analytics</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}