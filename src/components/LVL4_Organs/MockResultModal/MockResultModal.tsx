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
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { IconButton } from "@mui/material";
import { IoIosClose } from "react-icons/io";

const MockResultModal = ({
  open,
  handleClose,

  loading,
  timeSpent,
  saveResult,
  showDetails,
  totalMarks,
  totalQuestion,
  practice,
}: MockResultModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/student");
    handleClose();
  };
  const { width } = useWidth();
  return (
    <div className={styles["MockResultModal"]}>
      <CustomModal open={open} width={width > breakPoints?.sm ? 600 : "auto"}>
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {practice
              ? localeTitles?.TITLE_PRACTICE_EXAM_RESULT
              : localeTitles?.TITLE_MOCK_EXAM_RESULT}
          </Text>
          <IconButton
            className={`${styles["icon-button"]} `}
            onClick={() => navigateToDashboard()}
          >
            <IoIosClose />
          </IconButton>
        </div>
        <div className={styles["chartDiv"]}>
          <CircularProgressChart
            totalMarks={totalMarks}
            outOf={totalQuestion}
            size={177}
            strokeWidth={16}
          />
        </div>

        {timeSpent && (
          <div className={styles["timerSection"]}>
            <Text className={styles["timeSpentText"]}>
              {localeText?.TEXT_TIME_TAKEN}
            </Text>
            <Text className={styles["totalTime"]}>
              {formattedTime(timeSpent as number)}
            </Text>
          </div>
        )}
        {saveResult && showDetails ? (
          <div className="flex justify-between mt-4 space-x-4">
            {/* {practice ? (
              <Button
                type="button"
                className="primary"
                onClick={() => navigate("/student")}
              >
                {localeButtons.BUTTON_GO_TO_DASHBOARD}
              </Button>
            ) : ( */}
            <Button type="button" className="primary" onClick={saveResult}>
              {localeButtons.BUTTON_SAVE_RESULT}
            </Button>
            {/* )} */}
            <Button
              type="submit"
              className="primaryActive"
              onClick={showDetails}
              loading={loading}
            >
              {localeButtons.BUTTON_SHOW_DETAILS}
            </Button>
          </div>
        ) : (
          <div className="flex justify-between mt-4 space-x-4">
            <Button
              type="submit"
              className="primaryActive"
              onClick={handleClose}
              loading={loading}
            >
              {localeButtons.BUTTON_CLOSE}
            </Button>
          </div>
        )}
        {/* </form> */}
      </CustomModal>
    </div>
  );
};

export default MockResultModal;
