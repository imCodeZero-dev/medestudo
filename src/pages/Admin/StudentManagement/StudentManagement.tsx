import styles from "./StudentManagement.module.css";
import { StudentManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

// import { useCookies } from "react-cookie";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import studentsImg from "../../../assets/Images/dashboard/students.png";

import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useStudentManagement } from "./hook";

import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";

const StudentManagement = ({}: StudentManagementProps) => {
  const { localeTitles, localeLables, localeButtons } = useLocale();
  // const [cookies] = useCookies(["admin"]);
  const {
    control,
    watch,
    allStudents,
    allStudentsLoading,
    onChangeStudentStatus,

    onDeleteConfirm,
    deleteLoading,
    deleteModal,
    handleDeleteOpen,
    handleDeleteClose,
    statusLoading,
  } = useStudentManagement();
  // console.log("allStudents", allStudents);

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_STUDENTS,
      value: allStudents?.length,
      img: studentsImg,
      text: localeLables.LABEL_REGISTERED,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_STUDENTS,
      value: allStudents?.filter((obj: any) => obj.status === "active")?.length,
      img: studentsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: allStudents?.length,
    },
    {
      title: localeTitles?.TITLE_INACTIVE_STUDENTS,
      value: allStudents?.filter((obj: any) => obj.status === "inactive")
        ?.length,
      img: studentsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: allStudents?.length,
    },
  ];

  const headers = [
    "ID",
    "Name",
    "Email address",
    // "Last Activity",
    "Joined On",
    // "Joined VIA",
    "Status",
    "Action",
  ];

  console.log("allStudents", allStudents);
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
              text={val?.text}
              outOf={val?.outOf}
            />
          ))}
        </div>

        <div className={styles["StudentManagement-section"]}>
          <CustomTable
            loading={allStudentsLoading}
            headers={headers}
            data={Array.isArray(allStudents) ? allStudents : []}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={false}
            title={localeTitles?.TITLE_STUDENTS}
            handleDelete={handleDeleteOpen}
            showHeader
            handleStatusToggle={onChangeStudentStatus}
            watch={watch}
            statusLoading={statusLoading}
          />
        </div>

        <ConfirmationModal
          open={deleteModal}
          cancelButtonText={localeButtons?.BUTTON_CANCEL}
          confirmButtonText={localeButtons?.BUTTON_DELETE}
          onConfirm={onDeleteConfirm}
          icon={<AlertIcon />}
          title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
          handleClose={handleDeleteClose}
          loading={deleteLoading}
        />
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
