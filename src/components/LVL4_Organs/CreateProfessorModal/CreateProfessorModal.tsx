import styles from "./CreateProfessorModal.module.css";
import { CreateProfessorModalProps } from "./types";
import CustomModal from "../../LVL2_Molecules/ControlSelect/CustomModal/CustomModal";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";

const CreateProfessorModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
}: CreateProfessorModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles["CreateProfessorModal"]}>
      <CustomModal open={open} onClose={handleClose}>
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
              label={localeLables?.LABEL_USERNAME}
              control={control}
              name="email"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_USERNAME}
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
              type="password"
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
              type="password"
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
              onClick={handleSubmit(onSubmit)}
            >
              {localeButtons.BUTTON_CREATE}
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateProfessorModal;
