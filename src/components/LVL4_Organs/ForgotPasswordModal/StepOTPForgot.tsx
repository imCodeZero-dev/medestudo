import styles from "./ForgotPasswordModal.module.css";
import { StepEmailProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { MdEmail } from "react-icons/md";
import { Controller } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { useRef } from "react";

const StepOTPForgot = ({
  // open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  resendOtp,
  validOtp,
}: StepEmailProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleKeyPress = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    const regex = /^[0-9]+$/;
    if (!regex.test(keyValue)) {
      event.preventDefault();
    } else {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  return (
    <div className={styles["innerMain"]}>
      <Text className={styles["title"]}>
        {localeTitles?.TITLE_PASSWORD_RESET_CODE}
      </Text>
      <Text className={styles["basic"]}>
        {localeText?.TEXT_ENTER_CODE_YOU_RECEIVED}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={`pt-7 ${styles["inputDiv"]}`}>
          <div className="flex justify-between space-x-4 pb-6">
            {[1, 2, 3, 4].map((_, index) => (
              <Controller
                key={index}
                name={`otp[${index}]`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="numeric"
                    min={0}
                    max={9}
                    maxLength={1}
                    className={styles["otp-input"]}
                    onKeyPress={(event) => handleKeyPress(index, event)} // To prevent non-numeric input
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                  />
                )}
              />
            ))}
          </div>

          {!validOtp && (
            <Text className={styles["invalidText"]}>
              {localeText.TEXT_THE_CODE_YOU_ENTERED_IS_INVALID}
            </Text>
          )}

          <div className="flex items-center space-x-2 justify-center pb-3">
            <GrPowerReset size={16} color="#0030DD" />
            <Text className={styles["linkText"]} onClick={resendOtp}>
              {localeText.TEXT_RESEND_CODE}
            </Text>
          </div>
        </div>

        <div className="flex justify-between mt-4 space-x-4 ">
          <Button type="button" className="primary" onClick={handleClose}>
            {localeButtons.BUTTON_CANCEL}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          >
            {localeButtons.BUTTON_CONTINUE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepOTPForgot;
