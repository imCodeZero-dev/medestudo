import { useState } from "react";
import styles from "./ProfessorManagement.module.css";
import { ProfessorManagementProps } from "./types";
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
import { useProfessorManagement } from "./hook";
import { Chip } from "@mui/material";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";

const ProfessorManagement = ({}: ProfessorManagementProps) => {
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
  } = useProfessorManagement();
  console.log("cookies", cookies);

  const cards = [
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
  ];

  const headers = [
    "ID",
    "Name",
    "Email address",
    "Last Activity",
    "Created On",
    "Flashcards Created",
    "Past Exams Created",
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
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "disable",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "disable",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },
    {
      id: 1,
      image:
        "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
      name: "John Doe",
      status: "active",
      email: "test@test.com",
      lastActivity: "21 Dec,2022",
      createdOn: "21 Dec,2022",
      flashcardsCreated: 50,
      PastExamsCreated: 25,
    },

    // ... additional data
  ];
  const handleStatusToggle = (data: any) => {
    console.log("handleStatusToggle", data);
  };

  return (
    <AdminLayout>
      <div className={styles["ProfessorManagement"]}>
        <div className={styles["ProfessorManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_PROFESSORS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            <Button
              leftIcon={<IoMdAdd />}
              className="purpleBtn"
              onClick={handleOpenProfessor}
            >
              {localeButtons?.BUTTON_CREATE_PROFESSOR}
            </Button>
          </div>
        </div>

        <div className={styles["ProfessorManagement-cards"]}>
          {cards?.map((val, i) => (
            <DashboardCard
              key={i}
              title={val?.title}
              value={val?.value}
              img={val?.img}
            />
          ))}
        </div>

        <div className={styles["ProfessorManagement-section"]}>
          <CustomTable
            headers={headers}
            data={data}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={true}
            title={"Professors"}
            showHeader
            handleStatusToggle={handleStatusToggle}
          />
        </div>

        <CreateProfessorModal
          open={opneProfessorModal}
          handleClose={handleCloseProfessor}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitCreateProfessor}
        />
      </div>
    </AdminLayout>
  );
};

export default function ProfessorManagementServices() {
  return (
    <AdminRoutes>
      <ProfessorManagement />
    </AdminRoutes>
  );
}