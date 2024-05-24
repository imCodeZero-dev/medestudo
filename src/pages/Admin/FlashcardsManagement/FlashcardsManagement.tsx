import styles from "./FlashcardsManagement.module.css";
import { FlashcardsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import flashcardsImg from "../../../assets/Images/dashboard/flashcards.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useFlashcardsManagement } from "./hook";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import EditProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/EditProfessorModal";

const FlashcardsManagement = ({}: FlashcardsManagementProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
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
    allFlashcards,
    allFlashcardsLoading,
  } = useFlashcardsManagement();

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_FLASHCARDS,
      value: "2420",
      img: flashcardsImg,
      text: localeLables.LABEL_UPLOADED,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_FLASHCARDS,
      value: "2420",
      img: flashcardsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: "2420",
    },
    {
      title: localeTitles?.TITLE_INACTIVE_FLASHCARDS,
      value: "2420",
      img: flashcardsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: "2420",
    },
  ];

  const headers = ["ID", "Flashcard Title", "Created On", "Status"];
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
  console.log("allFlashcards", allFlashcards);

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
              outOf={val?.outOf}
            />
          ))}
        </div>

        <div className={styles["FlashcardsManagement-section"]}>
          <CustomTable
            loading={false}
            headers={headers}
            data={Array.isArray(data) ? data : []}
            // data={allFlashcards}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            handleEdit={handleOpenEdit}
            showEditIcon={true}
            title={localeTitles.TITLE_FLASHCARDS}
            showHeader
            handleStatusToggle={handleStatusToggle}
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
