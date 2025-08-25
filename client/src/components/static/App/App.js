import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { InputSection } from "../InputSection/InputSection";
import { TasksSection } from "../TasksSection";
import './App.css';
import {queryClient} from "../../../lib/react-query";

function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <InputSection />
          <div className="border-line"></div>
          <TasksSection />
        </div>

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
  );
}

export default App;