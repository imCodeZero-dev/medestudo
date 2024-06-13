import styles from "./CreateProfessorModal.module.css";
import { CreateProfessorModalProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const CreateProfessorModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
}: CreateProfessorModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewConfirmPassword, setViewConfirmPassword] =
    useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  const handleViewConfirm = () => {
    setViewConfirmPassword(!viewConfirmPassword);
  };
  return (
    <div className={styles[""]}>
      <CustomModal open={open} onClose={handleClose}>
        <div className={styles["CreateProfessorModal"]}>
          <img src={addUserIcon} className="" />

          <Text className={styles["title"]}>
            {localeTitles?.TITLE_ADD_PROFESSOR}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_A_NEW_PROFESSOR_WOULD_MSG}
          </Text>

          <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
            <div className={styles["inputDiv"]}>
              <Input
                label={localeLables?.LABEL_NAME}
                control={control}
                name="name"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            </div>
            <div className={styles["inputDiv"]}>
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
            <div className={styles["inputDiv"]}>
              <Input
                label={localeLables?.LABEL_PASSWORD}
                control={control}
                name="password"
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
                    <AiFillEye size={24} color="#8b93a1" onClick={handleView} />
                  )
                }
              />
            </div>
            <div className={styles["inputDiv"]}>
              <Input
                label={localeLables?.LABEL_CONFIRM_PASSWORD}
                control={control}
                name="confirmPassword"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PASSWORD}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type={!viewConfirmPassword ? "password" : "text"}
                suffix={
                  !viewConfirmPassword ? (
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
            <div className={styles["inputDiv"]}>
              <Input
                label={localeLables?.LABEL_PHONE}
                control={control}
                name="phone"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_PHONE}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="number"
              />
            </div>

            <div className="flex justify-between mt-4">
              <Button
                type="button"
                className="secondaryBtn"
                onClick={handleClose}
              >
                {localeButtons.BUTTON_CANCEL}
              </Button>
              <Button
                type="submit"
                className="purpleBtn"
                loading={loading}
                onClick={handleSubmit(onSubmit)}
              >
                {localeButtons.BUTTON_CREATE}
              </Button>
            </div>
          </form>
        </div>
      </CustomModal>
    </div>
  );
};

export default CreateProfessorModal;
