import styles from "./DecksManagement.module.css";
import { DecksManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";

import { useDecksManagement } from "./hook";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import CreateDeckSection from "../../../components/LVL4_Organs/CreateDeckSection/CreateDeckSection";

const DecksManagement = ({}: DecksManagementProps) => {
  const { localeTitles, localeButtons } = useLocale();
  const {
    control,
    createSection,
    handleCreate,
    handleCreateCancel,
    handleSubmit,
    onCreateSubmission,
    setValue,
    getValues,
    watch,
  } = useDecksManagement();

  return (
    <AdminLayout>
      <div className={styles["DecksManagement"]}>
        <div className={styles["DecksManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_DECKS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            <Button
              leftIcon={<IoMdAdd />}
              className="purpleBtn"
              onClick={handleCreate}
            >
              {localeButtons?.BUTTON_CREATE_DECK}
            </Button>
          </div>
        </div>

        {createSection && (
          <CreateDeckSection
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onCreateSubmission}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default function DecksManagementServices() {
  return (
    <AdminRoutes>
      <DecksManagement />
    </AdminRoutes>
  );
}
