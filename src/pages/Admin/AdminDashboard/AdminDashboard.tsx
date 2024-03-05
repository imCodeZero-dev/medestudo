import { useState } from "react";
import styles from "./AdminDashboard.module.css";
import { AdminDashboardProps } from "./types";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import { useCookies } from "react-cookie";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import studentsImg from "../../../assets/Images/dashboard/students.png";
import professorsImg from "../../../assets/Images/dashboard/professors.png";
import flashcardsImg from "../../../assets/Images/dashboard/flashcards.png";
import examsImgs from "../../../assets/Images/dashboard/exams.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";

const AdminDashboard = ({}: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const { localeTitles, localeButtons } = useLocale();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);

  console.log("cookies", cookies);

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_STUDENTS,
      value: "2420",
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_STUDENTS,
      value: "2420",
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_DISABLED_STUDENTS,
      value: "2420",
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_TOTAL_PROFESSORS,
      value: "2420",
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_PROFESSORS,
      value: "2420",
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_DISABLED_PROFESSOR,
      value: "2420",
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_TOTAL_FLASHCARDS,
      value: "2420",
      img: flashcardsImg,
    },
    { title: localeTitles?.TITLE_TOTAL_EXAMS, value: "2420", img: examsImgs },
  ];

  const headers = ["ID", "Name", "Age"];
  const data = [
    [1, "John Doe", 25],
    [2, "Jane Smith", 30],
    // ... additional data
  ];
  return (
    <AdminLayout>
      <div className={styles["AdminDashboard"]}>
        <div className={styles["AdminDashboard-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.WELCOME_BACK_ADMIN}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            <Button leftIcon={<IoMdAdd />} className="secondaryBtn">
              {localeButtons?.BUTTON_CREATE_TAG}
            </Button>
            <Button leftIcon={<IoMdAdd />} className="purpleBtn">
              {localeButtons?.BUTTON_CREATE_DECK}
            </Button>
          </div>
        </div>

        <div className={styles["AdminDashboard-cards"]}>
          {cards?.map((val, i) => (
            <DashboardCard
              key={i}
              title={val?.title}
              value={val?.value}
              img={val?.img}
            />
          ))}
        </div>

        <div className={styles["AdminDashboard-section"]}>
          <div className={styles["AdminDashboard-section-head"]}>
            <div>
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_PROFESSORS}
              </Text>
            </div>

            <Button leftIcon={<IoMdAdd />} className="purpleBtn">
              {localeButtons?.BUTTON_CREATE_NEW}
            </Button>
          </div>
          <CustomTable
            headers={headers}
            data={data}
            // pagination={true}
            rowsPerPage={5}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
