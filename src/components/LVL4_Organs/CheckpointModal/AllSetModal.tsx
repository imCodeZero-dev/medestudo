import styles from "./CheckpointModal.module.css";
import { AllSetModalProps } from "./types";
import allSetImg from "../../../assets/Images/Random/AllSet.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import CircularProgressChart from "../../LVL3_Cells/CircularProgressChart/CircularProgressChart";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";

const AllSetModal = ({ open, handleClose }: AllSetModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const navigate = useNavigate();
  return (
    <div className={styles["AllSetModal"]}>
      <CustomModal open={open} onClose={handleClose}>
        <img src={allSetImg} className={styles["img"]} />
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {localeTitles?.TITLE_YOU_ARE_ALL_SET_UP}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_CLICK_ON_CONTINUE_TO_DASHBOARD}
          </Text>
        </div>

        <div className="flex justify-between pt-8 space-x-4">
          {/* <Button type="button" className="primary" onClick={handleClose}>
            {localeButtons.BUTTON_CANCEL}
          </Button> */}
          <Button
            type="button"
            className="primaryActive"
            onClick={() => navigate("/student")}
            // loading={loading}
          >
            {localeButtons.BUTTON_GO_TO_DASHBOARD}
          </Button>
        </div>
      </CustomModal>
    </div>
  );
};

export default AllSetModal;
