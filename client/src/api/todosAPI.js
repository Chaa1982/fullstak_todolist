// todosAPI.js
const BASE_URL = "http://localhost:3001/todos";

export const todosAPI = {
    getTodos: async () => {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error("Error getting todos!");
        }
        return response.json();
    },

    addTodo: async (newTodo) => {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTodo),
        });
        if (!response.ok) {
            throw new Error("Error creating todo!");
        }
        return response.json();
    },

    updateTodo: async ({ id, ...updates }) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates)
        });
        if (!response.ok) {
            throw new Error("Error updating todo!");
        }
        return response.json();
    },

    deleteTodo: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error deleting todo!");
        }
        return { id };
    }
};