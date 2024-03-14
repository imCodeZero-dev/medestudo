import styles from "./AdminDashboard.module.css";
import { AdminDashboardProps } from "./types";
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
import { useAdminDashboard } from "./hook";
import { Chip } from "@mui/material";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import { useNavigate } from "react-router-dom";

const AdminDashboard = ({}: AdminDashboardProps) => {
  const { localeTitles, localeButtons } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,
    opneProfessorModal,
    handleOpenProfessor,
    handleCloseProfessor,
    handleSubmit,
    onSubmitCreateProfessor,
    allProfessors,
    onChangeProfessorStatus,
    watch,
    allStudents,
    allProfessorsLoading,
    allStudentsLoading,
  } = useAdminDashboard();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  const redirectToDecks = () => {
    navigate("/admin/decks");
  };
  const redirectToTags = () => {
    navigate("/admin/tags");
  };

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_STUDENTS,
      value: allStudents?.length,
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_STUDENTS,
      value: allStudents?.filter((obj: any) => obj.status === "active")?.length,
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_INACTIVE_STUDENTS,
      value: allStudents?.filter((obj: any) => obj.status === "inactive")
        ?.length,
      img: studentsImg,
    },
    {
      title: localeTitles?.TITLE_TOTAL_PROFESSORS,
      value: allProfessors?.length,
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_PROFESSORS,
      value: allProfessors?.filter((obj: any) => obj.status === "active")
        ?.length,
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_INACTIVE_PROFESSOR,
      value: allProfessors?.filter((obj: any) => obj.status === "inactive")
        ?.length,
      img: professorsImg,
    },
    {
      title: localeTitles?.TITLE_TOTAL_FLASHCARDS,
      value: "2420",
      img: flashcardsImg,
    },
    { title: localeTitles?.TITLE_TOTAL_EXAMS, value: "2420", img: examsImgs },
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
    // "Action",
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
            <Button
              leftIcon={<IoMdAdd />}
              className="secondaryBtn"
              onClick={redirectToTags}
            >
              {localeButtons?.BUTTON_CREATE_TAG}
            </Button>
            <Button
              leftIcon={<IoMdAdd />}
              className="purpleBtn"
              onClick={redirectToDecks}
            >
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
            <div className="flex space-x-2 items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_PROFESSORS}
              </Text>

              <Chip
                label={`Recent`}
                color="secondary"
                variant="outlined"
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Inter",
                }}
              />
            </div>

            <Button
              leftIcon={<IoMdAdd />}
              onClick={handleOpenProfessor}
              className="purpleBtn"
            >
              {localeButtons?.BUTTON_CREATE_NEW}
            </Button>
          </div>
          <CustomTable
            loading={allProfessorsLoading}
            headers={headers}
            data={Array.isArray(allProfessors) ? allProfessors : []}
            control={control}
            // pagination={true}
            rowsPerPage={5}
            showPagination={false}
            showDeleteIcon={true}
            showEditIcon={true}
            title={"Professors"}
            handleStatusToggle={onChangeProfessorStatus}
            watch={watch}
          />
        </div>

        <div className={styles["AdminDashboard-section"]}>
          <div className={styles["AdminDashboard-section-head"]}>
            <div className="flex space-x-2 items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_STUDENTS}
              </Text>

              <Chip
                label={`Recent`}
                color="secondary"
                variant="outlined"
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Inter",
                }}
              />
            </div>
          </div>
          <CustomTable
            loading={allStudentsLoading}
            headers={headers}
            data={Array.isArray(allStudents) ? allStudents : []}
            control={control}
            // pagination={true}
            rowsPerPage={5}
            showPagination={false}
            showDeleteIcon={true}
            // showEditIcon={true}
            title={"Professors"}
            handleStatusToggle={onChangeProfessorStatus}
            watch={watch}
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

export default function AdminDashboardServices() {
  return (
    <AdminRoutes>
      <AdminDashboard />
    </AdminRoutes>
  );
}
