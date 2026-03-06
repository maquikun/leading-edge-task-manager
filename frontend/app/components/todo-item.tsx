'use client';

import { LucideText, LucideTrash } from "lucide-react";
import { useState } from "react";

interface TodoItemProps {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
    onUpdateTitle?: (id: number, newTitle: string) => void;
    onUpdateDescription?: (id: number, newDescription: string) => void;
}

export default function TaskItem({ id, title, description, isCompleted, onComplete, onDelete, onUpdateTitle, onUpdateDescription }: TodoItemProps) {
    const [showDescription, setShowDescription] = useState(false);
    const [localTitle, setLocalTitle] = useState(title);
    const [localDescription, setLocalDescription] = useState(description || "");

    const handleToggle = () => {
        onComplete?.(id);
    };

    const handleTitleBlur = () => {
        if (localTitle.trim() !== title) {
            onUpdateTitle?.(id, localTitle.trim());
        }
    };

    const handleDescriptionBlur = () => {
        if (localDescription.trim() !== (description || "")) {
            onUpdateDescription?.(id, localDescription.trim());
        }
        
        setShowDescription(false);
    };

    return (
        <div className="flex flex-col items-center gap-2 p-4 bg-white font-medium dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 w-full">
                <input
                    type="checkbox"
                    id={`task-${id}`}
                    checked={isCompleted}
                    onChange={handleToggle}
                    className="w-4 h-4 2xl:w-5 2xl:h-5 rounded-xl border-gray-300 accent-blue-500 dark:border-neutral-600 dark:bg-neutral-700 cursor-pointer"
                />
                <textarea
                    value={localTitle}
                    rows={1}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    onClick={(e) => e.stopPropagation()} 
                    aria-label="Task title"
                    className={`flex-1 cursor-text outline-none text-sm 2xl:text-base resize-none ${isCompleted ? 'line-through text-gray-500 dark:text-neutral-500' : ''}`}
                />
                <button 
                    onClick={() => setShowDescription(!showDescription)} 
                    className="hover:text-neutral-400 cursor-pointer">
                        <LucideText className="w-5 2xl:w-6" aria-hidden="true" />
                </button>
                <button 
                    onClick={(e) => onDelete?.(id)} 
                    className="hover:text-red-500 cursor-pointer">
                        <LucideTrash className="w-5 2xl:w-6" aria-hidden="true" />
                </button>
            </div>
            {showDescription && (
                <textarea
                    placeholder="Add a description..."
                    value={localDescription}
                    onChange={(e) => setLocalDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    className="w-full p-3 mt-2 text-sm bg-neutral-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                    aria-label="Task description"
                />
            )}
        </div>
    );
}