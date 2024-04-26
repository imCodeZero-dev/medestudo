import styles from "./ForgotPasswordModal.module.css";
import { SuccessProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";

const StepSuccessForgot = ({
  // open,
  handleClose,
}: SuccessProps) => {
  const { localeTitles, localeText, localeButtons } = useLocale();

  return (
    <div className={`py-6  ${styles["innerMain"]}`}>
      <div className="flex flex-col space-y-2 pb-3">
        <Text className={styles["title"]}>
          {localeTitles?.TITLE_PASSWORD_CHANGED}
        </Text>
        <Text className={styles["basic"]}>
          {localeText?.TEXT_YOU_HAVE_SET_A_NEW_PASSWORD}
        </Text>
      </div>
      <div className="flex justify-between mt-4 space-x-4">
        <Button type="button" className="primaryActive" onClick={handleClose}>
          {localeButtons.BUTTON_CONTINUE_TO_LOGIN}
        </Button>
      </div>
    </div>
  );
};

export default StepSuccessForgot;
