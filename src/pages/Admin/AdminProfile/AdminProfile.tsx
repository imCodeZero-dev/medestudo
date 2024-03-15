import styles from "./AdminProfile.module.css";
import { AdminProfileProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import { useCookies } from "react-cookie";
import { useAdminProfile } from "./hook";
import { Chip } from "@mui/material";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import { useNavigate } from "react-router-dom";
import AvatarImg from "../../../assets/Images/dashboard/Avatar.png";
import Input from "../../../components/LVL1_Atoms/Input";
import { CiEdit } from "react-icons/ci";
import { FaPencil } from "react-icons/fa6";
import AvatarUploader from "../../../components/LVL2_Molecules/ImageUploader/AvatarUploader";

const AdminProfile = ({}: AdminProfileProps) => {
  const {
    localeTitles,
    localeButtons,
    localeText,
    localeLables,
    localePlaceholders,
  } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const { control, handleSubmit, watch } = useAdminProfile();
  console.log("cookies", cookies);
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className={styles["AdminProfile"]}>
        <Text className={styles["mainHeading"]}>
          {localeTitles?.TITLE_SETTINGS}
        </Text>
        <div className={styles["AdminProfile-head"]}>
          <div className={styles["head-left"]}>
            {/* <div className="relative">
              <img src={AvatarImg} className={styles["image"]} />
              <div className="absolute top-0 right-0 z-10 cursor-pointer">
                <FaPencil />
              </div>
            </div> */}
            <AvatarUploader control={control} name="image" watch={watch} />
            <div>
              <Text className={styles["name"]}>Olivia</Text>
              <Text className={styles["email"]}>Oliviajohn@gmail.com</Text>
            </div>
          </div>
          <div className={styles["head-right"]}>
            <Button leftIcon={<IoMdAdd />} className="secondaryBtn">
              {localeButtons?.BUTTON_CANCEL}
            </Button>
            <Button leftIcon={<IoMdAdd />} className="purpleBtn">
              {localeButtons?.BUTTON_SAVE}
            </Button>
          </div>
        </div>

        <div className={styles["AdminProfile-text"]}>
          <Text className={styles["sectionHeading"]}>
            {localeTitles?.TITLE_PERSONAL_INFO}
          </Text>
          <Text className={styles["greyText"]}>
            {localeText?.TEXT_YOU_CAN_CHANGE_PASSWORD_NAME_AND_EMAIL}
          </Text>
        </div>

        <div className="grid grid-cols-2 space-x-6 my-6">
          <div className={styles["AdminProfile-section"]}>
            <div className="grid grid-cols-2 space-x-6">
              <Input
                label={localeLables?.LABEL_CURRENT_PASSWORD}
                control={control}
                name="currentPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />

              <Input
                label={localeLables?.LABEL_NEW_PASSWORD}
                control={control}
                name="newPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            </div>

            <div className="my-4">
              <Input
                label={localeLables?.LABEL_CONFIRM_PASSWORD}
                control={control}
                name="confirmPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            </div>
            <Button className="purpleBtn">
              {localeButtons?.BUTTON_FORGOT_PASSWORD}
            </Button>
          </div>
          <div className={styles["AdminProfile-section"]}>
            <div className="grid grid-cols-2 space-x-2">
              <Input
                label={localeLables?.LABEL_NAME}
                control={control}
                name="name"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />

              <Input
                label={localeLables?.LABEL_LAST_NAME}
                control={control}
                name="lastName"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            </div>

            <div className="my-4">
              <Input
                label={localeLables?.LABEL_EMAIL}
                control={control}
                name="email"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_EMAIL}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="email"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function AdminProfileServices() {
  return (
    <AdminRoutes>
      <AdminProfile />
    </AdminRoutes>
  );
}
