import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import fontF from "../assets/Fonts/static/Inter-Regular.ttf";
import fontF from "../assets/Fonts/static/Inter-Regular.ttf";
import Home from "../pages/Home/Home";
import AuthVerification from "../pages/AuthVerification";
// import "../index.css";

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
const InstituteManagementServices = React.lazy(
  () => import("../pages/Admin/InstituteManagement/InstituteManagement")
);
const AdminProfileServices = React.lazy(
  () => import("../pages/Admin/AdminProfile/AdminProfile")
);
const LoginServices = React.lazy(() => import("../pages/LoginPage/LoginPage"));
const ProfessorDashboardServices = React.lazy(
  () => import("../pages/Professor/ProfessorDashboard/ProfessorDashboard")
);
const ProfessorClassesServices = React.lazy(
  () => import("../pages/Professor/ProfessorClasses/ProfessorClasses")
);
const ProfessorSettingsServices = React.lazy(
  () => import("../pages/Professor/ProfessorSettings/ProfessorSettings")
);
const ProfessorExamsServices = React.lazy(
  () => import("../pages/Professor/ProfessorExams/ProfessorExams")
);
const DeckDetailsServices = React.lazy(
  () => import("../pages/Professor/DeckDetails/DeckDetails")
);
const CreateFlashcardServices = React.lazy(
  () => import("../pages/Professor/CreateFlashcard/CreateFlashcard")
);
const AllFlashCardsServices = React.lazy(
  () => import("../pages/Professor/AllFlashCards/AllFlashCards")
);
const ExamsDetailsServices = React.lazy(
  () => import("../pages/Professor/ExamsDetails/ExamsDetails")
);
const CreateExamQuestionServices = React.lazy(
  () => import("../pages/Professor/CreateQuestion/CreateExamQuestion")
);
const AllQuestionsServices = React.lazy(
  () => import("../pages/Professor/AllQuestions/AllQuestions")
);
const StudentFormPageServices = React.lazy(
  () => import("../pages/Student/Student_Form/StudentFormPage")
);
const StudentDashboardServices = React.lazy(
  () => import("../pages/Student/StudentDashboard/StudentDashboard")
);
const StudentFlashcardsExploreServices = React.lazy(
  () =>
    import("../pages/Student/StudentFlashcardsExplore/StudentFlashcardsExplore")
);
const StudentDeckDetailsServices = React.lazy(
  () => import("../pages/Student/StudentDeckDetails/StudentDeckDetails")
);
const StudentAllFlashCardsServices = React.lazy(
  () => import("../pages/Student/StudentAllFlashCards/StudentAllFlashCards")
);
const StudentCustomClassesServices = React.lazy(
  () => import("../pages/Student/StudentCustomClasses/StudentCustomClasses")
);
const CustomDeckDetailsServices = React.lazy(
  () => import("../pages/Student/CustomDeckDetails/CustomDeckDetails")
);
const StudentFavoritesServices = React.lazy(
  () => import("../pages/Student/StudentFavorites/StudentFavorites")
);
const CreateCustomFlashcardServices = React.lazy(
  () => import("../pages/Professor/CreateCustomFlashcard/CreateCustomFlashcard")
);
const StudentReviewDecksServices = React.lazy(
  () => import("../pages/Student/StudentReviewDecks/StudentReviewDecks")
);
const StudentPracticeExamsServices = React.lazy(
  () => import("../pages/Student/StudentPracticeExams/StudentPracticeExams")
);
const StudentMockExamsServices = React.lazy(
  () => import("../pages/Student/StudentMockExams/StudentMockExams")
);
const StudentStartExamServices = React.lazy(
  () => import("../pages/Student/StudentStartExam/StudentStartExam")
);
const StudentResultServices = React.lazy(
  () => import("../pages/Student/StudentResult/StudentResult")
);
const StudentSettingsServices = React.lazy(
  () => import("../pages/Student/StudentSettings/StudentSettings")
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
            <Route
              path="/admin/institute"
              element={<InstituteManagementServices />}
            />
            <Route path="/admin/profile" element={<AdminProfileServices />} />

            <Route path="/professor/login" element={<LoginServices />} />
            <Route path="/professor" element={<ProfessorDashboardServices />} />
            <Route
              path="/professor/classes"
              element={<ProfessorClassesServices />}
            />
            <Route
              path="/professor/classes/deck"
              element={<DeckDetailsServices />}
            />
            <Route
              path="/professor/classes/deck/flashcard"
              element={<CreateFlashcardServices />}
            />
            <Route
              path="/professor/classes/deck/flashcard/:deckId"
              element={<AllFlashCardsServices />}
            />
            <Route
              path="/professor/settings"
              element={<ProfessorSettingsServices />}
            />
            <Route
              path="/professor/exams"
              element={<ProfessorExamsServices />}
            />
            <Route
              path="/professor/exams/exam"
              element={<ExamsDetailsServices />}
            />

            <Route
              path="/professor/exams/exam/question"
              element={<CreateExamQuestionServices />}
            />

            <Route
              path="/professor/exams/exam/:examId"
              element={<AllQuestionsServices />}
            />
            <Route path="/student/login" element={<LoginServices />} />
            <Route
              path="/student/survey"
              element={<StudentFormPageServices />}
            />
            <Route path="/student" element={<StudentDashboardServices />} />
            <Route
              path="/student/flashcards/explore"
              element={<StudentFlashcardsExploreServices />}
            />
            <Route
              path="/student/flashcards/custom"
              element={<StudentCustomClassesServices />}
            />
            <Route
              path="/student/flashcard/deck"
              element={<StudentDeckDetailsServices />}
            />
            <Route
              path="/student/flashcard/custom/:deckId"
              element={<CustomDeckDetailsServices />}
            />
            <Route
              path="/student/flashcard/deck/flashcard/:deckId"
              element={<StudentAllFlashCardsServices />}
            />
            <Route
              path="/student/classes/custom/flashcard"
              element={<CreateCustomFlashcardServices />}
            />
            <Route
              path="/student/flashcards/review"
              element={<StudentReviewDecksServices />}
            />
            <Route
              path="/student/flashcards/favorite"
              element={<StudentFavoritesServices />}
            />
            <Route
              path="/student/exams/practice"
              element={<StudentPracticeExamsServices />}
            />
            <Route
              path="/student/exams/mock"
              element={<StudentMockExamsServices />}
            />
            <Route
              path="/student/exams/mock/study"
              element={<StudentStartExamServices />}
            />
            <Route
              path="/student/exams/practice/study"
              element={<StudentStartExamServices />}
            />
            <Route
              path="/student/exams/result"
              element={<StudentResultServices />}
            />
            <Route
              path="/student/settings"
              element={<StudentSettingsServices />}
            />
            {/* <Route
              path="/authVerification:token"
              element={<AuthVerification />}
            /> */}
            <Route path="/authVerification" element={<AuthVerification />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </React.Suspense>
  );
};
export default ProjectRoutes;
