import styles from "./ForgotPasswordModal.module.css";
import { StepEmailProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { MdEmail, MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const StepNewPasswordForgot = ({
  // open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
}: StepEmailProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  const handleViewConfirm = () => {
    setConfirmPassword(!confirmPassword);
  };
  return (
    <div className={styles["innerMain"]}>
      <Text className={styles["title"]}>
        {localeTitles?.TITLE_FORGOT_PASSWORD}
      </Text>
      <Text className={styles["basic"]}>
        {localeText?.TEXT_PLEASE_CREATE_YOUR_NEW_PASSWORD}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={`pt-7 flex flex-col space-y-3 ${styles["inputDiv"]}`}>
          <Input
            control={control}
            name="passwordForgot"
            placeholder={localePlaceholders.PLACEHOLDER_NEW_PASSWORD}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type={!viewPassword ? "password" : "text"}
            prefix={<MdOutlineKey size={24} />}
            suffix={
              !viewPassword ? (
                <AiFillEyeInvisible
                  size={24}
                  color="#8b93a1"
                  onClick={handleView}
                />
              ) : (
                <AiFillEye size={24} color="#8b93a1" onClick={handleView} />
              )
            }
          />

          <Input
            control={control}
            name="confirmPasswordForgot"
            placeholder={localePlaceholders.PLACEHOLDER_CONFIRM_PASSWORD}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type={!confirmPassword ? "password" : "text"}
            prefix={<MdOutlineKey size={24} />}
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

        <div className="flex justify-between mt-4 space-x-4">
          <Button type="button" className="primary" onClick={handleClose}>
            {localeButtons.BUTTON_CANCEL}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            {localeButtons.BUTTON_FINISH}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepNewPasswordForgot;
