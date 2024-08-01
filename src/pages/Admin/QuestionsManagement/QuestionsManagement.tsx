import styles from "./QuestionsManagement.module.css";
import { QuestionsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import examsImgs from "../../../assets/Images/dashboard/exams.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useQuestionsManagement } from "./hook";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import { useEffect, useState } from "react";
import {
  countAllQuestions,
  getCurrentAndPreviousMonthData,
  getDecodedText,
} from "../../../utils/hooks/helper";
import { dashboardDataType } from "../../../utils/constants/DataTypes";

const QuestionsManagement = ({}: QuestionsManagementProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const { control, watch, allQuestions, dashboardData } =
    useQuestionsManagement();
  const [modifiedArray, setModifiedArray] = useState();
  const [currentMonthData, setCurrentMonthData] = useState<dashboardDataType>();
  const [prevMonthData, setPrevMonthData] = useState<dashboardDataType>();

  useEffect(() => {
    if (allQuestions?.length > 0) {
      const modifiedFlashcards = allQuestions?.map((card: any) => ({
        ...card,
        question: getDecodedText(card.question).join(" "),
      }));
      setModifiedArray(modifiedFlashcards);
    }
  }, [allQuestions]);

  useEffect(() => {
    if (dashboardData?.length > 0) {
      const { currentMonthData, previousMonthData } =
        getCurrentAndPreviousMonthData(dashboardData);

      setCurrentMonthData(currentMonthData);
      setPrevMonthData(previousMonthData);
    }
  }, [dashboardData]);

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_QUESTIONS,
      value: countAllQuestions(dashboardData),
      img: examsImgs,
      text: localeLables.LABEL_UPLOADED,
    },
    {
      title: `${localeTitles.TITLE_THIS_MONTH}: ${currentMonthData?.month}`,
      value: currentMonthData?.questions,
      img: examsImgs,
      text: localeLables.LABEL_UPLOADED,
      // text: localeLables.LABEL_OUT_OF,
      // outOf: countAllQuestions(dashboardData),
    },
    {
      title: `${localeTitles.TITLE_PREVIOUS_MONTH}: ${currentMonthData?.prevMonth}`,

      value: currentMonthData?.prevMonthQuestions,
      img: examsImgs,
      text: localeLables.LABEL_UPLOADED,
      // text: localeLables.LABEL_OUT_OF,
      // outOf: countAllQuestions(dashboardData),
    },
  ];

  const headers = ["ID", "Question Title", "Correct Answer", "Created On"];

  const handleStatusToggle = (data: any) => {
  };

  return (
    <AdminLayout>
      <div className={styles["QuestionsManagement"]}>
        <div className={styles["QuestionsManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_QUESTIONS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
        </div>

        <div className={styles["QuestionsManagement-cards"]}>
          {cards?.map((val, i) => (
            <DashboardCard
              key={i}
              title={val?.title}
              value={val?.value}
              img={val?.img}
              text={val?.text}
              // outOf={val?.outOf}
            />
          ))}
        </div>

        <div className={styles["QuestionsManagement-section"]}>
          <CustomTable
            loading={false}
            headers={headers}
            data={Array.isArray(modifiedArray) ? modifiedArray : []}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={true}
            title={localeTitles.TITLE_QUESTIONS}
            showHeader
            handleStatusToggle={handleStatusToggle}
            watch={watch}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default function QuestionsManagementServices() {
  return (
    <AdminRoutes>
      <QuestionsManagement />
    </AdminRoutes>
  );
}
