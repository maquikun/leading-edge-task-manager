import { Todo } from "../types/todo";

const API_URL = "http://localhost:5130/v1";

export const todoApi = {
    async getTodos(): Promise<Todo[]> {
        const response = await fetch(`${API_URL}/todos`);
        if (!response.ok) throw new Error("Failed to fetch todos");
        return await response.json();
    },

    async createTodo(todo: Partial<Todo>): Promise<Todo> {
        const response = await fetch(`${API_URL}/todos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error("Failed to create todo");
        return await response.json();
    },

    async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todo),
        });
        if (!response.ok) throw new Error("Failed to update todo");
        return await response.json();
    },

    async deleteTodo(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete todo");
    },
}