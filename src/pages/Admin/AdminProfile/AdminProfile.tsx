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

import AvatarUploader from "../../../components/LVL2_Molecules/ImageUploader/AvatarUploader";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const AdminProfile = ({}: AdminProfileProps) => {
  const {
    localeTitles,
    localeButtons,
    localeText,
    localeLables,
    localePlaceholders,
  } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const {
    control,
    handleSubmit,
    watch,
    onSubmitUpdateAdmin,
    handleSubmitPassword,
    controlPassword,
    passwordErrors,
    watchPasswordFields,
    onSubmitResetPasswordAdmin,
    resetLoading,
    profileLoading,
  } = useAdminProfile();
  console.log("cookies", cookies);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };
  const handleViewNew = () => {
    setNewPassword(!newPassword);
  };
  const handleViewConfirm = () => {
    setConfirmPassword(!confirmPassword);
  };
  const navigate = useNavigate();

  // const [uwConfig] = useState({
  //   CLOUDINARY_CLOUD_NAME,
  //   CLOUDINARY_API_KEY

  // });

  return (
    <AdminLayout>
      <div className={styles["AdminProfile"]}>
        <Text className={styles["mainHeading"]}>
          {localeTitles?.TITLE_SETTINGS}
        </Text>

        <div className={styles["AdminProfile-head"]}>
          <div className={styles["head-left"]}>
            <AvatarUploader control={control} name="image" watch={watch} />

            <div>
              <Text
                className={styles["name"]}
              >{`${cookies?.admin?.firstName} ${cookies?.admin?.lastName}`}</Text>
              <Text className={styles["email"]}>{cookies?.admin?.email}</Text>
            </div>
          </div>
          <div className={styles["head-right"]}>
            {/* <Button
              type="button"
              leftIcon={<IoMdAdd />}
              className="secondaryBtn"
            >
              {localeButtons?.BUTTON_CANCEL}
            </Button> */}
            {/* <Button
              type="submit"
              leftIcon={<IoMdAdd />}
              className="purpleBtn"
              onClick={handleSubmit(onSubmitUpdateAdmin)}
            >
              {localeButtons?.BUTTON_SAVE}
            </Button> */}
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
          <form
            onSubmit={handleSubmit(onSubmitUpdateAdmin)}
            className={styles["form"]}
          >
            <div className={styles["AdminProfile-section"]}>
              <div className="grid grid-cols-2 space-x-2">
                <Input
                  label={localeLables?.LABEL_NAME}
                  control={control}
                  name="firstName"
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
                  readOnly
                />
              </div>
              <Button
                type="submit"
                leftIcon={<IoMdAdd />}
                className="purpleBtn"
                onClick={handleSubmit(onSubmitUpdateAdmin)}
                loading={profileLoading}
              >
                {localeButtons?.BUTTON_SAVE}
              </Button>
            </div>
          </form>

          <form
            onSubmit={handleSubmitPassword(onSubmitResetPasswordAdmin)}
            className={styles["form"]}
          >
            <div className={styles["AdminProfile-section"]}>
              <div className="">
                <Input
                  label={localeLables?.LABEL_CURRENT_PASSWORD}
                  control={controlPassword}
                  name="currentPassword"
                  placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                  preDefinedClassName="lesserHeight"
                  preDefinedWrapClassName="inputField-wrap"
                  type={!viewPassword ? "password" : "text"}
                  suffix={
                    !viewPassword ? (
                      <AiFillEyeInvisible
                        size={24}
                        color="#8b93a1"
                        onClick={handleView}
                      />
                    ) : (
                      <AiFillEye
                        size={24}
                        color="#8b93a1"
                        onClick={handleView}
                      />
                    )
                  }
                />
              </div>

              <div className="grid grid-cols-2 space-x-6 my-4">
                <Input
                  label={localeLables?.LABEL_NEW_PASSWORD}
                  control={controlPassword}
                  name="newPassword"
                  placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                  preDefinedClassName="lesserHeight"
                  preDefinedWrapClassName="inputField-wrap"
                  type={!newPassword ? "password" : "text"}
                  suffix={
                    !newPassword ? (
                      <AiFillEyeInvisible
                        size={24}
                        color="#8b93a1"
                        onClick={handleViewNew}
                      />
                    ) : (
                      <AiFillEye
                        size={24}
                        color="#8b93a1"
                        onClick={handleViewNew}
                      />
                    )
                  }
                />
                <Input
                  label={localeLables?.LABEL_CONFIRM_PASSWORD}
                  control={controlPassword}
                  name="confirmPassword"
                  placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                  preDefinedClassName="lesserHeight"
                  preDefinedWrapClassName="inputField-wrap"
                  type={!confirmPassword ? "password" : "text"}
                  suffix={
                    !confirmPassword ? (
                      <AiFillEyeInvisible
                        size={24}
                        color="#8b93a1"
                        onClick={handleViewConfirm}
                      />
                    ) : (
                      <AiFillEye
                        size={24}
                        color="#8b93a1"
                        onClick={handleViewConfirm}
                      />
                    )
                  }
                />
              </div>
              <Button
                className="purpleBtn"
                type="submit"
                loading={resetLoading}
              >
                {localeButtons?.BUTTON_RESET_PASSWORD}
              </Button>
            </div>
          </form>
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
