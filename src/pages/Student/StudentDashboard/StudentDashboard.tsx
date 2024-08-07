import styles from "./StudentDashboard.module.css";
import { StudentDashboardProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentDashboard } from "./hook";
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
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import DashboardReviewDeck from "../../../components/LVL3_Cells/DashboardReviewDeck/DashboardReviewDeck";
import DonutChart from "../../../components/LVL3_Cells/Charts/DonutChart";

export const dummyDecks = [
  {
    title: "Lesson Abdome 1",
  },
  {
    title: "Lesson Abdome 2",
  },
  {
    title: "Lesson Abdome 3",
  },
];
export const dummyFlashcardDetails = [
  {
    image: flashcard1,
    title: "Orthopedic",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
    subjects: ["Neurology", "Medical", "Clinic"],
  },
];

export const dummyFlashCards = [
  {
    image: flashcard1,
    title: "Orthopedic",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
    subjects: ["Neurology", "Medical", "Clinic"],
  },
  {
    image: flashcard2,
    title: "Dermatology",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Dermatology" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard3,
    title: "ENT",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "ENT" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard1,
    title: "Orthopedic",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard2,
    title: "Dermatology",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Dermatology" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard3,
    title: "ENT",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "ENT" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard1,
    title: "Orthopedic",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard2,
    title: "Dermatology",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "OrthDermatologyopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard3,
    title: "ENT",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "ENT" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard1,
    title: "Orthopedic",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard2,
    title: "Dermatology",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Dermatology" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
  {
    image: flashcard3,
    title: "ENT",
    date: "24 Dec,2023",
    deckId: { image: flashcard1, name: "Orthopedic" },
    decks: [
      { name: "Lesson 1", flashcards: 4 },
      { name: "Lesson 2", flashcards: 1 },
      { name: "Lesson 3", flashcards: 14 },
      { name: "Lesson 4", flashcards: 22 },
    ],
  },
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

const StudentDashboard = ({}: StudentDashboardProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["student"]);
  const {
    control,

    handleSubmit,

    watch,
    allClasses,
    allClassesLoading,
    getDetails,
    getDetailsExam,
    allExams,
    dashboardData,
    totals,
    reviewDecks,
    counts,
  } = useStudentDashboard();
  console.log("cookies", cookies);
  const navigate = useNavigate();


  const dsahboardCards = [
    {
      title: localeTitles?.TITLE_TOTAL_DECKS,
      value: totals?.allDecks,
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
      value: totals.allQuestions,
      // image: examsImgs,
      icon: <RiQuestionAnswerLine size={50} color="#A2A9B3" />,
      text: localeTitles?.TITLE_UPLOADED,
    },
  ];

  return (
    <HomeLayout>
      <div className={styles["StudentDashboard"]}>
        <div className={styles["StudentDashboard-main"]}>
          <DashboardReviewDeck
            redirectTo={"/student/flashcards/review"}
            total={reviewDecks?.length}
          />
          <div className={styles["StudentDashboard-cards"]}>
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

          <div className={styles["StudentDashboard-section"]}>
            <Text className={styles["sectionHeading"]}>
              {localeTitles?.TITLE_FLASHCARDS_AND_QUESTIONS_CREATED}
            </Text>
            <BarChartComponent
              data={dashboardData}
              legends={[
                localeTitles?.TITLE_FLASHCARDS,
                localeTitles?.TITLE_QUESTIONS,
              ]}
            />
          </div>

          <div className={styles["StudentDashboard-section"]}>
            <div className="flex justify-between items-center">
              <Text className={`${styles["sectionHeading"]} mb-4`}>
                {localeTitles?.TITLE_FLASHCARDS_STUDIED}
              </Text>
              {/* <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/exams")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text> */}
            </div>
            <div className="flex flex-wrap md:grid md:grid-cols-3 md:space-x-4 space-y-3 ">
              <div className="w-full bg-white rounded-sm flex items-center justify-center shadow-sm">
                <DonutChart
                  available={counts?.today}
                  total={reviewDecks?.length}
                  duration="Today"
                  color="#0030DD"
                />
              </div>
              <div className="w-full bg-white rounded-sm flex items-center justify-center shadow-sm">
                <DonutChart
                  available={counts?.thisWeek}
                  total={reviewDecks?.length}
                  duration="This Week"
                  color="#FF900E"
                />
              </div>
              <div className=" w-full bg-white rounded-sm flex items-center justify-center shadow-sm">
                <DonutChart
                  available={counts?.thisMonth}
                  total={reviewDecks?.length}
                  duration="This Month"
                  color="#6683EB"
                />
              </div>
            </div>

            {/* {allExams?.slice(0, 3)?.map((data: examCardData, i: number) => (
              <DashboardExams
                key={i}
                data={data}
                play
                getDetails={getDetailsExam}
              />
            ))} */}
          </div>
        </div>

        <div className={styles["StudentDashboard-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_CLASSES}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/student/flashcards/explore")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allClasses?.slice(0, 3)?.map((data: any, i: number) => (
              <DashboardFlashcard
                key={i}
                data={data}
                play
                minView
                getDetailsCustom={getDetails}
              />
            ))}
          </div>

          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_EXAMS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/student/exams/mock")}
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
      </div>
    </HomeLayout>
  );
};

export default function StudentDashboardServices() {
  return (
    <StudentRoutes>
      <StudentDashboard />
    </StudentRoutes>
  );
}
