// useTodos.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {todosAPI} from "../api/todosAPI";


export const useTodos = () => {
    const queryClient = useQueryClient();

    const todosQuery = useQuery({
        queryKey: ['todos'],
        queryFn: todosAPI.getTodos,
    });

    const addTodoMutation = useMutation({
        mutationFn: todosAPI.addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
        },
    });

    const updateTodoMutation = useMutation({
        mutationFn: todosAPI.updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const deleteTodoMutation = useMutation({
        mutationFn: todosAPI.deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    return {
        todos: todosQuery.data || [],
        isLoading: todosQuery.isLoading,
        error: todosQuery.error,

        addTodo: addTodoMutation.mutate,
        updateTodo: updateTodoMutation.mutate,
        deleteTodo: deleteTodoMutation.mutate,

        isAdding: addTodoMutation.isLoading,
        isUpdating: updateTodoMutation.isLoading,
        isDeleting: deleteTodoMutation.isLoading,
    };
};