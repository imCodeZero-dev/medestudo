import styles from "./CheckpointModal.module.css";
import { CheckpointModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import CircularProgressChart from "../../LVL3_Cells/CircularProgressChart/CircularProgressChart";
import { formatTime } from "../TimerComponent/TimerComponent";
import { formattedTime } from "../../../utils/hooks/helper";
import { useNavigate } from "react-router-dom";

const CheckpointModal = ({
  open,
  handleClose,
  handleSubmit,
  loadMore,
  control,
  loading,
  timeSpent,
  navigateToDashboard,masteryLevel
}: CheckpointModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const navigate = useNavigate();

  return (
    <div className={styles["CheckpointModal"]}>
      <CustomModal open={open}>
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {localeTitles?.TITLE_CHECKPOINT}
          </Text>
          <div className={styles["chartDiv"]}>
            <CircularProgressChart
              percentage={masteryLevel}
              size={177}
              strokeWidth={16}
            />
          </div>
        </div>

        <div className={styles["timerSection"]}>
          <Text className={styles["timeSpentText"]}>
            {localeText?.TEXT_TIME_SPENT_ON_THIS_ROUND}
          </Text>
          <Text className={styles["totalTime"]}>
            {formattedTime(timeSpent as number)}
          </Text>
        </div>
        <div className="flex justify-between mt-4 space-x-4">
          <Button type="button" className="primary" onClick={loadMore}>
            {localeButtons.BUTTON_10_MORE_CARDS}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            onClick={navigateToDashboard}
            loading={loading}
          >
            {localeButtons.BUTTON_GO_TO_DASHBOARD}
          </Button>
        </div>
        {/* </form> */}
      </CustomModal>
    </div>
  );
};

export default CheckpointModal;
