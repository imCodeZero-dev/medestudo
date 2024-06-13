import styles from "./FlashcardsManagement.module.css";
import { FlashcardsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import flashcardsImg from "../../../assets/Images/dashboard/flashcards.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useFlashcardsManagement } from "./hook";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import {
  countAllFlashcards,
  getCurrentAndPreviousMonthData,
  getDecodedText,
} from "../../../utils/hooks/helper";
import { useEffect, useState } from "react";
import { dashboardDataType } from "../../../utils/constants/DataTypes";

const FlashcardsManagement = ({}: FlashcardsManagementProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [modifiedArray, setModifiedArray] = useState();
  const [currentMonthData, setCurrentMonthData] = useState<dashboardDataType>();
  const [prevMonthData, setPrevMonthData] = useState<dashboardDataType>();
  const { control, watch, allFlashcards, allFlashcardsLoading, dashboardData } =
    useFlashcardsManagement();

  useEffect(() => {
    if (allFlashcards?.length > 0) {
      const modifiedFlashcards = allFlashcards?.map((card: any) => ({
        ...card,
        question: getDecodedText(card.question).join(" "),
        answer: getDecodedText(card.answer).join(" "),
      }));
      setModifiedArray(modifiedFlashcards);
    }
  }, [allFlashcards]);
  useEffect(() => {
    if (dashboardData?.length > 0) {
      const { currentMonthData, previousMonthData } =
        getCurrentAndPreviousMonthData(dashboardData);

      setCurrentMonthData(currentMonthData);
      setPrevMonthData(previousMonthData);
    }
  }, [dashboardData]);

  // console.log("modifiedArray", modifiedArray);

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_FLASHCARDS,
      value: allFlashcards?.length,
      // value: countAllFlashcards(dashboardData),
      img: flashcardsImg,
      text: localeLables.LABEL_UPLOADED,
    },
    {
      title: `${localeTitles.TITLE_THIS_MONTH}: ${currentMonthData?.month}`,
      value: currentMonthData?.flashcards,
      img: flashcardsImg,
      text: localeLables.LABEL_UPLOADED,
      // text: localeLables.LABEL_OUT_OF,
      // outOf: "2420",
    },
    {
      title: `${localeTitles.TITLE_PREVIOUS_MONTH}: ${prevMonthData?.month}`,
      value: prevMonthData?.flashcards,
      img: flashcardsImg,
      text: localeLables.LABEL_UPLOADED,
      // text: localeLables.LABEL_OUT_OF,
      // outOf: "2420",
    },
  ];

  const headers = ["ID", "Question", "Answer", "Created On"];

  const handleStatusToggle = (data: any) => {
    console.log("handleStatusToggle", data);
  };
  // console.log("allFlashcards", allFlashcards);

  return (
    <AdminLayout>
      <div className={styles["FlashcardsManagement"]}>
        <div className={styles["FlashcardsManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_FLASHCARDS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
        </div>

        <div className={styles["FlashcardsManagement-cards"]}>
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

        <div className={styles["FlashcardsManagement-section"]}>
          <CustomTable
            loading={allFlashcardsLoading}
            headers={headers}
            // data={Array.isArray(data) ? data : []}
            data={Array.isArray(modifiedArray) ? modifiedArray : []}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={true}
            title={localeTitles.TITLE_FLASHCARDS}
            showHeader
            // handleStatusToggle={handleStatusToggle}
            watch={watch}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default function FlashcardsManagementServices() {
  return (
    <AdminRoutes>
      <FlashcardsManagement />
    </AdminRoutes>
  );
}
