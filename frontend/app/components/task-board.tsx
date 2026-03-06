'use client';

import { useState, useEffect } from "react";
import TodoItem from "./todo-item";
import TaskForm from "./task-form";
import { todoApi } from "../services/api";
import { Todo } from "../types/todo";


export default function TaskBoard() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            const todos = await todoApi.getTodos();
            setTodos(todos);
        } catch (error) {
            console.error(error);
        }
    };

    // Sort todos by completed
    const incompleteTodos = todos.filter(todo => !todo.isCompleted);
    const completedTodos = todos.filter(todo => todo.isCompleted);
    const sortedTodos = [...incompleteTodos, ...completedTodos];

    const handleComplete = async (id: number) => {
        const todo = todos.find(todo => todo.id === id);
        if (!todo) return;

        const newStatus = !todo.isCompleted;

        try {
            await todoApi.updateTodo(id, {isCompleted: newStatus });

            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, isCompleted: newStatus };
                }
                return todo;
            })

            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateTitle = async (id: number, newTitle: string) => {
        try {
            await todoApi.updateTodo(id, {title: newTitle });

            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, title: newTitle };
                }
                return todo;
            })

            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateDescription = async (id: number, newDescription: string) => {
        try {
            await todoApi.updateTodo(id, {description: newDescription });

            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, description: newDescription };
                }
                return todo;
            })

            setTodos(updatedTodos);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await todoApi.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    function greetingHelper() {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good Morning";
        } else if (hour < 18) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    }

    return (
        <main className="flex flex-1 flex-col h-full w-full items-start py-6 px-8 gap-2 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-200/70 dark:border-neutral-700/70 overflow-y-auto">
            <h1 className="text-xl lg:text-2xl 2xl:text-3xl font-medium">{greetingHelper()}!</h1>
            <p className="text-gray-600 dark:text-gray-300">What will you accomplish today?</p>
            <div className="flex flex-col gap-3 mt-4 w-full">
                {sortedTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        isCompleted={todo.isCompleted}
                        onComplete={handleComplete}
                        onDelete={handleDelete}
                        onUpdateTitle={handleUpdateTitle}
                        onUpdateDescription={handleUpdateDescription}
                    />
                ))}
                <TaskForm 
                    showForm={showForm}
                    onToggleForm={() => setShowForm(!showForm)}
                    onTaskCreated={() => {
                        loadTodos();
                        setShowForm(false);
                    }}
                />
            </div>
        </main>
    );
}