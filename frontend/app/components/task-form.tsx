'use client';

import { LucidePlus } from "lucide-react";
import { useState } from "react";
import { todoApi } from "../services/api";

interface TodoFormProps {
    showForm: boolean;
    onToggleForm: () => void;
    onTaskCreated?: () => void;
}

export default function TaskForm({ showForm, onToggleForm, onTaskCreated }: TodoFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            alert("Please enter a task title");
            return;
        }

        setIsSubmitting(true);
        try {
            await todoApi.createTodo({
                title: title.trim(),
                description: description.trim() || undefined,
                isCompleted: false
            });
            
            setTitle("");
            setDescription("");
            onTaskCreated?.();
        } catch (error) {
            console.error("Failed to create task:", error);
            alert("Failed to create task. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!showForm) {
        return (
            <button 
                onClick={onToggleForm}
                className="flex flex-row items-center gap-2 p-4 bg-white font-medium dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 cursor-pointer"
                aria-label="Add new task"
            >
                <LucidePlus className="w-5 2xl:w-6 -mt-0.5" aria-hidden="true" />
                <span className="text-sm 2xl:text-base">Add task</span>
            </button>
        );
    }


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 p-6 w-full bg-white font-medium dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700"
            >
                <h1 className="font-medium mb-1 px-1">Add New Task</h1>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-3 text-sm bg-neutral-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <textarea
                    placeholder="Add a description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-3 mt-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    aria-label="Task description"
                />
                <div className="flex flex-row max-sm:flex-col gap-3 py-4">
                    <button 
                        type="button"
                        onClick={onToggleForm}
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-sm 2xl:text-base bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 rounded-lg text-sm 2xl:text-base bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? "Creating..." : "Create Task"}
                    </button>
                </div>
            </form>
        </div>
    );
}