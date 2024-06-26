import { ReactNode } from "react";
import styles from "./ConfirmationModal.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";

type Props = {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  // handleSubmit: any;
  subTitle?: string;
  icon?: ReactNode;
  onConfirm: () => void;
  cancelButtonText: string;
  confirmButtonText: string;
  title?: string;
};

const ConfirmationModal = ({
  subTitle,
  icon,
  handleClose,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  loading,
  title,
  open,
}: Props) => {
  return (
    // <Modal open={open} onClose={handleClose} className="custom-modal">
    <CustomModal open={open} onClose={handleClose}>
      <div className={styles["ConfirmationModal"]}>
        {icon && <div className={styles[""]}>{icon}</div>}
        {title && <Text className={styles["title"]}>{title}</Text>}

        <Text className={styles["sub-title"]}>{subTitle}</Text>

        <div className={styles["ConfirmationModal-buttons"]}>
          <Button className={"purpleBtn"} onClick={onConfirm} loading={loading}>
            {confirmButtonText}
          </Button>
          <Button className={"secondaryBtn"} onClick={handleClose}>
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmationModal;
