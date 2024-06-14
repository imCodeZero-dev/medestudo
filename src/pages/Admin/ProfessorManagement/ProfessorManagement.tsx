import styles from "./ProfessorManagement.module.css";
import { ProfessorManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import DashboardCard from "../../../components/LVL3_Cells/DashboardCard/DashboardCard";
import professorsImg from "../../../assets/Images/dashboard/professors.png";
import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useProfessorManagement } from "./hook";
import CreateProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/CreateProfessorModal";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import EditProfessorModal from "../../../components/LVL4_Organs/CreateProfessorModal/EditProfessorModal";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";

const ProfessorManagement = ({}: ProfessorManagementProps) => {
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
    professorLoading,

    allProfessors,
    refetchAllProfessors,
    onChangeProfessorStatus,
    allProfessorsLoading,
    onSubmitEditProfessor,

    deleteModal,
    handleDeleteOpen,
    handleDeleteClose,
    onDeleteConfirm,
    deleteLoading,
    statusLoading,
  } = useProfessorManagement();
  console.log("allProfessors", allProfessors);

  const cards = [
    {
      title: localeTitles?.TITLE_TOTAL_PROFESSORS,
      value: allProfessors?.length,
      img: professorsImg,
      text: localeLables.LABEL_REGISTERED,
    },
    {
      title: localeTitles?.TITLE_ACTIVE_PROFESSORS,
      value: allProfessors?.filter((obj: any) => obj.status === "active")
        ?.length,
      img: professorsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: allProfessors?.length,
    },
    {
      title: localeTitles?.TITLE_INACTIVE_PROFESSOR,
      value: allProfessors?.filter((obj: any) => obj.status === "inactive")
        ?.length,
      img: professorsImg,
      text: localeLables.LABEL_OUT_OF,
      outOf: allProfessors?.length,
    },
  ];

  const headers = [
    "ID",
    "Name",
    "Email address",
    "Phone",
    "Created On",
    "Flashcards Created",
    "Questions Created",
    "Status",
    "Action",
  ];

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
              text={val?.text}
              outOf={val?.outOf}
            />
          ))}
        </div>

        <div className={styles["ProfessorManagement-section"]}>
          <CustomTable
            loading={allProfessorsLoading}
            headers={headers}
            data={Array.isArray(allProfessors) ? allProfessors : []}
            control={control}
            // pagination={true}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            handleEdit={handleOpenEdit}
            handleDelete={handleDeleteOpen}
            showEditIcon={true}
            title={localeTitles?.TITLE_PROFESSORS}
            showHeader
            handleStatusToggle={onChangeProfessorStatus}
            watch={watch}
            statusLoading={statusLoading}
            
          />
        </div>

        <CreateProfessorModal
          open={opneProfessorModal}
          handleClose={handleCloseProfessor}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitCreateProfessor}
          loading={professorLoading}
        />
        <EditProfessorModal
          open={editProfessorModal}
          handleClose={handleCloseEdit}
          control={control}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitEditProfessor}
          loading={editLoading}
        />

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

export default function ProfessorManagementServices() {
  return (
    <AdminRoutes>
      <ProfessorManagement />
    </AdminRoutes>
  );
}
