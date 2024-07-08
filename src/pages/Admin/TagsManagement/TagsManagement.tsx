import styles from "./TagsManagement.module.css";
import { TagsManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

// import { useCookies } from "react-cookie";

import CustomTable from "../../../components/LVL3_Cells/CustomTable/CustomTable";
import { useTagsManagement } from "./hook";

import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import CreateTagsModal from "../../../components/LVL4_Organs/CreateTagsModal/CreateTagsModal";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import EditTagsModal from "../../../components/LVL4_Organs/CreateTagsModal/EditTagsModal";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import LogoutIcon from "../../../assets/svgs/LogoutIcon";
import DeleteDeckIcon from "../../../assets/svgs/DeleteDeckIcon";
import AlertIcon from "../../../assets/svgs/AlertIcon";

const TagsManagement = ({}: TagsManagementProps) => {
  const { localeTitles, localeButtons } = useLocale();
  // const [cookies] = useCookies(["admin"]);
  const {
    control,
    handleCloseCreate,
    handleSubmit,
    onSubmitCreate,
    openCreate,
    handleOpenCreate,
    onSubmitEdit,
    handleCloseEdit,
    handleEditTag,
    editTagModal,
    allTags,
    createLoading,
    onChangeTagStatus,
    deleteModal,
    handleDeleteModalOpen,
    handleDeleteModalClose,
    onDeleteConfirm,
    watch,
    allTagsLoading,
    statusLoading,
  } = useTagsManagement();
  console.log("allTags", allTags);

  const headers = ["ID", "Title", "Created On", "Status", "Action"];

  return (
    <AdminLayout>
      <div className={styles["TagsManagement"]}>
        <div className={styles["TagsManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_TAGS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            <Button
              leftIcon={<IoMdAdd />}
              className="purpleBtn"
              onClick={handleOpenCreate}
            >
              {localeButtons?.BUTTON_ADD_NEW_TAG}
            </Button>
          </div>
        </div>

        <div className={styles["TagsManagement-section"]}>
          <CustomTable
            loading={allTagsLoading}
            headers={headers}
            data={Array.isArray(allTags) ? allTags : []}
            control={control}
            rowsPerPage={10}
            showPagination={true}
            showDeleteIcon={true}
            showEditIcon={true}
            handleEdit={handleEditTag}
            title={localeTitles?.TITLE_TAGS}
            showHeader
            handleStatusToggle={onChangeTagStatus}
            handleDelete={handleDeleteModalOpen}
            watch={watch}
            statusLoading={statusLoading}
          />
        </div>

        <CreateTagsModal
          control={control}
          handleClose={handleCloseCreate}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitCreate}
          open={openCreate}
          loading={createLoading}
        />

        <EditTagsModal
          control={control}
          handleClose={handleCloseEdit}
          handleSubmit={handleSubmit}
          onSubmit={onSubmitEdit}
          open={editTagModal}
          loading={createLoading}
        />

        <ConfirmationModal
          open={deleteModal}
          cancelButtonText={localeButtons?.BUTTON_CANCEL}
          confirmButtonText={localeButtons?.BUTTON_DELETE}
          onConfirm={onDeleteConfirm}
          icon={<AlertIcon />}
          title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
          handleClose={handleDeleteModalClose}
          loading={createLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default function TagsManagementServices() {
  return (
    <AdminRoutes>
      <TagsManagement />
    </AdminRoutes>
  );
}
