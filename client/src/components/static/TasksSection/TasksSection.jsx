import { TodoCard } from "../TodoCard";
import { useState } from "react";
import './TasksSection.css';
import {useTodos} from "../../../hooks/useTodos";

export const TasksSection = () => {
    const [editingId, setEditingId] = useState(null);

    const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();

    const handleToggle = (taskId) => {
        const taskToUpdate = todos.find(todo => todo.id === taskId);
        if (!taskToUpdate) return;

        updateTodo({
            id: taskId,
            isDone: !taskToUpdate.isDone
        });
    };

    const handleDelete = (taskId) => {
        deleteTodo(taskId);
    };

    const handleEdit = (taskId, newText) => {
        if (!newText.trim()) return;
        updateTodo({ id: taskId, task: newText });
        setEditingId(null);
    };

    if (isLoading) return <div className="tasks-section">Loading tasks...</div>;
    if (error) return <div className="tasks-section">Error: {error.message}</div>;

    return (
        <div className="tasks-section">
            {todos.length > 0 ? (
                todos.map(task => (
                    <div className="task-item" key={task.id}>
                        <TodoCard
                            task={task}
                            isEditing={editingId === task.id}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                            onStartEditing={() => setEditingId(task.id)}
                            onCancelEditing={() => setEditingId(null)}
                        />
                    </div>
                ))
            ) : (
                <p>No tasks yet</p>
            )}
        </div>
    );
};