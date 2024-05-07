import styles from "./ProfessorDashboard.module.css";
import { ProfessorDashboardProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useProfessorDashboard } from "./hook";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import DashboardChartCard from "../../../components/LVL3_Cells/DashboardChartCard/DashboardChartCard";
import BarChartComponent from "../../../components/LVL4_Organs/BarChartComponent/BarChartComponent";
import flashcard1 from "../../../assets/Images/dashboard/flashcard1.png";
import flashcard2 from "../../../assets/Images/dashboard/flashcard2.png";
import flashcard3 from "../../../assets/Images/dashboard/flashcard3.png";
import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";
import DashboardExams from "../../../components/LVL3_Cells/DashboardExams/DashboardExams";
import flashcardsImg from "../../../assets/Images/dashboard/flashcards.png";
import examsImgs from "../../../assets/Images/dashboard/exams.png";
import { MdOutlineViewCarousel } from "react-icons/md";
import { PiExam } from "react-icons/pi";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { Class } from "../../../utils/constants/DataTypes";
import { examCardData } from "../../../components/LVL3_Cells/DashboardExams/@types";

export const dummyFlashCards = [
  { image: flashcard1, title: "Orthopedic", date: "24 Dec,2023" },
  { image: flashcard2, title: "Dermatology", date: "24 Dec,2023" },
  { image: flashcard3, title: "ENT", date: "24 Dec,2023" },
  { image: flashcard1, title: "Orthopedic", date: "24 Dec,2023" },
  { image: flashcard2, title: "Dermatology", date: "24 Dec,2023" },
  { image: flashcard3, title: "ENT", date: "24 Dec,2023" },
  { image: flashcard1, title: "Orthopedic", date: "24 Dec,2023" },
  { image: flashcard2, title: "Dermatology", date: "24 Dec,2023" },
  { image: flashcard3, title: "ENT", date: "24 Dec,2023" },
  { image: flashcard1, title: "Orthopedic", date: "24 Dec,2023" },
  { image: flashcard2, title: "Dermatology", date: "24 Dec,2023" },
  { image: flashcard3, title: "ENT", date: "24 Dec,2023" },
];

export const dummyExams = [
  {
    title: "Surgery Past Exam",
    year: "2023",
    time: "3 Hrs",
    institute: "Xyz international",
  },
  {
    title: "Surgery Past Exam",
    year: "2023",
    time: "3 Hrs",
    institute: "Xyz international",
  },
  {
    title: "Surgery Past Exam",
    year: "2023",
    time: "3 Hrs",
    institute: "Xyz international",
  },
  {
    title: "Surgery Past Exam",
    year: "2023",
    time: "3 Hrs",
    institute: "Xyz international",
  },
  {
    title: "Surgery Past Exam",
    year: "2023",
    time: "3 Hrs",
    institute: "Xyz international",
  },
];

export const dummyQuestions = [
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
  {
    title: "Surgery Past Exam",
    _id: "123",
  },
];

const ProfessorDashboard = ({}: ProfessorDashboardProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,

    handleSubmit,

    watch,
    allClasses,
    allClassesLoading,
    getDetails,
    getDetailsExam,
    allExams,
  } = useProfessorDashboard();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  const dummyData = [
    { name: "Jan", Sales: 100, Expenses: 90 },
    { name: "Feb", Sales: 120, Expenses: 95 },
    { name: "Mar", Sales: 140, Expenses: 100 },
    { name: "Apr", Sales: 160, Expenses: 110 },
    { name: "May", Sales: 180, Expenses: 120 },
    { name: "Jun", Sales: 200, Expenses: 130 },
    { name: "Jul", Sales: 220, Expenses: 140 },
    { name: "Aug", Sales: 240, Expenses: 150 },
    { name: "Sep", Sales: 260, Expenses: 160 },
    { name: "Oct", Sales: 280, Expenses: 170 },
    { name: "Nov", Sales: 300, Expenses: 180 },
    { name: "Dec", Sales: 320, Expenses: 190 },
  ];

  const dsahboardCards = [
    {
      title: localeTitles?.TITLE_TOTAL_FLASHCARDS,
      value: 33,
      // image: flashcardsImg,
      icon: <MdOutlineViewCarousel size={50} color="#A2A9B3" />,
      text: localeTitles?.TITLE_UPLOADED,
    },
    {
      title: localeTitles?.TITLE_TOTAL_PAST_EXAMS,
      value: 5,
      // image: examsImgs,
      icon: <PiExam size={50} color="#A2A9B3" />,
      text: localeTitles?.TITLE_UPLOADED,
    },
    {
      title: localeTitles?.TITLE_TOTAL_QUESTIONS,
      value: 126,
      // image: examsImgs,
      icon: <RiQuestionAnswerLine size={50} color="#A2A9B3" />,
      text: localeTitles?.TITLE_UPLOADED,
    },
  ];

  return (
    <HomeLayout>
      <div className={styles["ProfessorDashboard"]}>
        <div className={styles["ProfessorDashboard-main"]}>
          <div className={styles["ProfessorDashboard-cards"]}>
            {dsahboardCards?.map((data, i) => (
              <DashboardChartCard
                key={i}
                text={data?.text}
                title={data?.title}
                icon={data?.icon}
                value={data?.value} // Example value representing progress
              />
            ))}
          </div>

          <div className={styles["ProfessorDashboard-section"]}>
            <Text className={styles["sectionHeading"]}>
              {localeTitles?.TITLE_FLASHCARDS_AND_QUESTIONS_CREATED}
            </Text>
            <BarChartComponent
              data={dummyData}
              legends={[
                localeTitles?.TITLE_FLASHCARDS,
                localeTitles?.TITLE_QUESTIONS,
              ]}
            />
          </div>

          <div className={styles["ProfessorDashboard-section"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_EXAMS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/exams")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allExams?.slice(0, 3)?.map((data: examCardData, i: number) => (
              <DashboardExams
                key={i}
                data={data}
                play
                getDetails={getDetailsExam}
              />
            ))}
          </div>
        </div>

        <div className={styles["ProfessorDashboard-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/classes")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allClasses?.slice(0, 8)?.map((data: Class, i: number) => (
              <DashboardFlashcard
                key={i}
                data={data}
                play
                minView
                getDetails={getDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default function ProfessorDashboardServices() {
  return (
    <ProfessorRoutes>
      <ProfessorDashboard />
    </ProfessorRoutes>
  );
}
