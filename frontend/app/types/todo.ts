export interface Todo {
    id: number;
    title: string;
    description?: string;
    isCompleted: boolean;
    createdAt: string; // We technically don't need these defined here since we aren't using them
    updatedAt: string; // But adding them for consistency with the backend model, plus in a real project they could be useful
}