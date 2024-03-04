import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useLocale from "./locales";
import LanguageSelector from "./components/LanguageSelector";
import AuthLayout from "./components/LVL5_Layouts/AuthLayout/AuthLayout";
import ProjectRoutes from "./Routes";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./config/QueryClient";
import ToastProvider from "./config/toastProvider/ToastProvider";

function App() {
  const [count, setCount] = useState(0);
  const { localeTitles } = useLocale();

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
