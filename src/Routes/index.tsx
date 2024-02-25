import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LoadingScreen = React.lazy(
  () => import("../pages/LoadingScreen/LoadingScreen")
);
const NotFound = React.lazy(() => import("../pages/NotFound"));
const AdminLogin = React.lazy(() => import("../pages/AdminLogin/AdminLogin"));
const App = React.lazy(() => import("../App"));


const ProjectRoutes = () => {
  // const { localeBasics } = useLocale();
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
