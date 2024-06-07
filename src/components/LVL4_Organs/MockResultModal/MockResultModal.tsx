import styles from "./MockResultModal.module.css";
import { MockResultModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import CircularProgressChart from "../../LVL3_Cells/CircularProgressChart/CircularProgressChart";
import { formatTime } from "../TimerComponent/TimerComponent";
import { formattedTime } from "../../../utils/hooks/helper";
import { useNavigate } from "react-router-dom";

const MockResultModal = ({
  open,
  handleClose,
  handleSubmit,
  control,
  loading,
  timeSpent,
  saveResult,
  showDetails,
}: MockResultModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const navigate = useNavigate();

  return (
    <div className={styles["MockResultModal"]}>
      <CustomModal open={open}>
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {localeTitles?.TITLE_MOCK_EXAM_RESULT}
          </Text>
          <div className={styles["chartDiv"]}>
            <CircularProgressChart
              percentage={95}
              size={177}
              strokeWidth={16}
            />
          </div>
        </div>

        <div className={styles["timerSection"]}>
          <Text className={styles["timeSpentText"]}>
            {localeText?.TEXT_TIME_TAKEN}
          </Text>
          <Text className={styles["totalTime"]}>
            {formattedTime(timeSpent as number)}
          </Text>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <Button type="button" className="primary" onClick={saveResult}>
            {localeButtons.BUTTON_SAVE_RESULT}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            onClick={showDetails}
            loading={loading}
          >
            {localeButtons.BUTTON_SHOW_DETAILS}
          </Button>
        </div>
        {/* </form> */}
      </CustomModal>
    </div>
  );
};

export default MockResultModal;
