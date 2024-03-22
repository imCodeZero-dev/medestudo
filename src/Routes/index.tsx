import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import fontF from "../assets/Fonts/static/Inter-Regular.ttf";

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
const DecksManagementServices = React.lazy(
  () => import("../pages/Admin/DecksManagement/DecksManagement")
);
const TagsManagementServices = React.lazy(
  () => import("../pages/Admin/TagsManagement/TagsManagement")
);
const AdminProfileServices = React.lazy(
  () => import("../pages/Admin/AdminProfile/AdminProfile")
);
const LoginServices = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const ProfessorDashboardServices = React.lazy(
  () => import("../pages/Professor/ProfessorDashboard/ProfessorDashboard")
);
const App = React.lazy(() => import("../App"));

const ProjectRoutes = () => {
  // const { localeBasics } = useLocale();
  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: `
          @font-face {
            src:  url(${fontF}) format('ttf');
          }
        `,
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "@font-face": {
            fontFamily: "Inter", // Use the same font family name as specified above
            src: `url(${fontF}) format('ttf')`, // Update the format if needed
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
            <Route path="/admin/decks" element={<DecksManagementServices />} />
            <Route path="/admin/tags" element={<TagsManagementServices />} />
            <Route path="/admin/profile" element={<AdminProfileServices />} />

            <Route path="/professor/login" element={<LoginServices />} />
            <Route path="/professor" element={<ProfessorDashboardServices />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Suspense>
  );
};
export default ProjectRoutes;
