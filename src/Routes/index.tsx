import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const LoadingScreen = React.lazy(
  () => import("../pages/LoadingScreen/LoadingScreen")
);
const NotFound = React.lazy(() => import("../pages/NotFound"));
const AdminLogin = React.lazy(() => import("../pages/AdminLogin/AdminLogin"));
const AdminDashboardServices = React.lazy(
  () => import("../pages/Admin/AdminDashboard/AdminDashboard")
);
const ProfessorManagementServices = React.lazy(
  () => import("../pages/Admin/ProfessorManagement/ProfessorManagement")
);
const StudentManagementServices = React.lazy(
  () => import("../pages/Admin/StudentManagement/StudentManagement")
);
const FlashcardsManagementServices = React.lazy(
  () => import("../pages/Admin/FlashcardsManagement/FlashcardsManagement")
);
const QuestionsManagementServices = React.lazy(
  () => import("../pages/Admin/QuestionsManagement/QuestionsManagement")
);
const App = React.lazy(() => import("../App"));

const ProjectRoutes = () => {
  // const { localeBasics } = useLocale();
  const theme = createTheme({
    typography: {
      fontFamily: "Inter",
    },
    // palette: {
    //   primary: { main: "#1A43C0" },
    //   white: { main: "#ffff" },
    //   yellow: { main: "yellow" },
    // },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            fontFamily: "Inter", // Add !important
            fontSize: 64,
            color: "red",
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            fontFamily: "monospace",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            fontFamily: "Inter",
          },
        },
      },
    },
  });
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<AdminDashboardServices />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboardServices />} />
            <Route
              path="/admin/professors"
              element={<ProfessorManagementServices />}
            />
            <Route
              path="/admin/students"
              element={<StudentManagementServices />}
            />
            <Route
              path="/admin/flashcards"
              element={<FlashcardsManagementServices />}
            />
            <Route
              path="/admin/questions"
              element={<QuestionsManagementServices />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Suspense>
  );
};
export default ProjectRoutes;
