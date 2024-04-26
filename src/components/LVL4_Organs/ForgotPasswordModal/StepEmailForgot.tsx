import styles from "./ForgotPasswordModal.module.css";
import { StepEmailProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { MdEmail } from "react-icons/md";

const StepEmailForgot = ({
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

  return (
    <div className={styles["innerMain"]}>
      <Text className={styles["title"]}>
        {localeTitles?.TITLE_FORGOT_PASSWORD}
      </Text>
      <Text className={styles["basic"]}>
        {localeText?.TEXT_ENTER_YOUR_EMAIL_FORGOT}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={`pt-7 ${styles["inputDiv"]}`}>
          <Input
            prefix={<MdEmail size={24} />}
            // label={localeLables?.LABEL_INSTITUTE_TITLE}
            control={control}
            name="forgotEmail"
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_EMAIL}
            preDefinedClassName="inputField"
            preDefinedWrapClassName="inputField-wrap"
            type="email"
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
            {localeButtons.BUTTON_SEND_CODE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepEmailForgot;
