import styles from "./ViewImageModal.module.css";
import { ViewImageModalProps } from "./types";
import useLocale from "../../../locales";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";

import { useNavigate } from "react-router-dom";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
// import { redirect } from "react-router-dom";

const ViewImageModal = ({ open, handleClose, image }: ViewImageModalProps) => {
  const {} = useLocale();
  const { width } = useWidth();

  const navigate = useNavigate();
  return (
    <div className={styles["ViewImageModal"]}>
      <CustomModal
        open={open}
        onClose={handleClose}
        width={width > breakPoints?.sm ? 600 : "auto"}
      >
        <img src={image} className={styles["img"]} />
      </CustomModal>
    </div>
  );
};

export default ViewImageModal;
