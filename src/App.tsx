import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useLocale from "./locales";
import LanguageSelector from "./components/LanguageSelector";
import AuthLayout from "./components/LVL5_Layouts/AuthLayout/AuthLayout";
import ProjectRoutes from "./Routes";

function App() {
  const [count, setCount] = useState(0);
  const { localeTitles } = useLocale();

  return (
    <>
      {/* <LanguageSelector /> */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div> */}
      <ProjectRoutes />
      {/* <p className="read-the-docs">{localeTitles.TITLE_TEST}</p> */}
    </>
  );
}

export default App;
