import styles from "./QuestionsManagement.module.css";
import { QuestionsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import examsImgs from "../../../assets/Images/dashboard/exams.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useQuestionsManagement } from "./hook";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import EditProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/EditProfessorModal";

const QuestionsManagement = ({}: QuestionsManagementProps) => {
  const { localeTitles, localeButtons } = useLocale();
  const {
    control,
    opneProfessorModal,
    handleOpenProfessor,
    handleCloseProfessor,
    handleSubmit,
    onSubmitCreateProfessor,
    editProfessorModal,
    handleOpenEdit,
    handleCloseEdit,
    editLoading,
    watch,
  } = useQuestionsManagement();

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_QUESTIONS,
      value: "2420",
      img: examsImgs,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_QUESTIONS,
      value: "2420",
      img: examsImgs,
    },
    {
      title: localeTitles?.TITLE_INACTIVE_QUESTIONS,
      value: "2420",
      img: examsImgs,
    },
  ];

  const headers = ["ID", "Question Title", "Created On", "Status"];
  const data = [
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
    {
      id: 1,
      status: "active",
      createdOn: "21 Dec,2022",
      title:
        "d ornare est congue. Phasellus quis sapien tempor massa congue vulputate et sed quam. Cras commodo imperdiet arcu non laoreet. Pellentesque fringilla mi in lacus viverra, et finibus lacus lobortis.",
    },
  ];
  const handleStatusToggle = (data: any) => {
    console.log("handleStatusToggle", data);
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
            />
          ))}
        </div>

        <div className={styles["QuestionsManagement-section"]}>
          <CustomTable
          loading={false}
            headers={headers}
            data={data}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            handleEdit={handleOpenEdit}
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
