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

const StudentManagement = ({}: StudentManagementProps) => {
  const { localeTitles } = useLocale();
  // const [cookies] = useCookies(["admin"]);
  const {
    control,
    watch,
    allStudents,
    allStudentsLoading,
    onChangeStudentStatus,
  } = useStudentManagement();
  // console.log("cookies", cookies);

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
            showHeader
            handleStatusToggle={onChangeStudentStatus}
            watch={watch}
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
