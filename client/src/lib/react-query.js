import { QueryClient } from "@tanstack/react-query"; // главный класс, который управляет всем кэшем и состоянием


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
        }
    }
});