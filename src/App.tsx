import "./App.css";
import ProjectRoutes from "./Routes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/QueryClient";
import ToastProvider from "./config/toastProvider/ToastProvider";

function App() {
  return (
    <>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <ProjectRoutes />
        </QueryClientProvider>
      </ToastProvider>
    </>
  );
}

export default App;
