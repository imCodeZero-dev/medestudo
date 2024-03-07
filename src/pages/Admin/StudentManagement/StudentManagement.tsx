import { useState } from "react";
import styles from "./StudentManagement.module.css";
import { StudentManagementProps } from "./types";
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
import { useStudentManagement } from "./hook";
import { Chip } from "@mui/material";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";

const StudentManagement = ({}: StudentManagementProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const { localeTitles, localeButtons } = useLocale();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const {
    control,
    opneProfessorModal,
    handleOpenProfessor,
    handleCloseProfessor,
    handleSubmit,
    onSubmitCreateProfessor,
  } = useStudentManagement();
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
  ];

  const headers = [
    "ID",
    "Name",
    "Last Activity",
    "Joined On",
    "Joined VIA",
    "Email address",
    "Status",
    "Action",
  ];
  const data = [
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      lastActivity: "21 Dec,2022",
      email: "test@test.com",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "disable",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "disable",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      joinedOn: "21 Dec,2022",
      joinedVia: "Google",
    },

    // ... additional data
  ];
  const handleStatusToggle = (data: any) => {
    console.log("handleStatusToggle", data);
  };

  return (
    <AdminLayout>
      <div className={styles["StudentManagement"]}>
        <div className={styles["StudentManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_STUDENTS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
        </div>

        <div className={styles["StudentManagement-cards"]}>
          {cards?.map((val, i) => (
            <DashboardCard
              key={i}
              title={val?.title}
              value={val?.value}
              img={val?.img}
            />
          ))}
        </div>

        <div className={styles["StudentManagement-section"]}>
          <CustomTable
            headers={headers}
            data={data}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={false}
            title={"Students"}
            showHeader
            handleStatusToggle={handleStatusToggle}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default function StudentManagementServices() {
  return (
    <AdminRoutes>
      <StudentManagement />
    </AdminRoutes>
  );
}
