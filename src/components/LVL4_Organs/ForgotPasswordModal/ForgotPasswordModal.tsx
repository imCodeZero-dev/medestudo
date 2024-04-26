import styles from "./ForgotPasswordModal.module.css";
import { ForgotPasswordModalProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { IoFingerPrintOutline } from "react-icons/io5";
import StepEmailForgot from "./StepEmailForgot";
import StepOTPForgot from "./StepOTPForgot";
import StepNewPasswordForgot from "./StepNewPasswordForgot";
import { IoCheckmarkSharp } from "react-icons/io5";
import StepSuccessForgot from "./StepSuccessForgot";

const ForgotPasswordModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
}: ForgotPasswordModalProps) => {
  const success = false;
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  return (
    <div className={styles[""]}>
      <CustomModal open={open} onClose={handleClose} width={450}>
        <div className={styles["forgotMain"]}>
          {!success ? (
            <div className={styles["icon"]}>
              <IoFingerPrintOutline size={40} color="white" />
            </div>
          ) : (
            <div className={styles["successIcon"]}>
              <IoCheckmarkSharp size={40} color="white" />
            </div>
          )}

          {/* <StepEmailForgot
            control={control}
            handleSubmit={handleSubmit}
            loading={loading}
            onSubmit={onSubmit}
            handleClose={handleClose}
          /> */}

          <StepOTPForgot
            control={control}
            handleSubmit={handleSubmit}
            loading={loading}
            onSubmit={onSubmit}
            handleClose={handleClose}
          />
          {/* <StepNewPasswordForgot
            control={control}
            handleSubmit={handleSubmit}
            loading={loading}
            onSubmit={onSubmit}
            handleClose={handleClose}
          /> */}
          {/* <StepSuccessForgot handleClose={handleClose} /> */}
        </div>
      </CustomModal>
    </div>
  );
};

export default ForgotPasswordModal;
