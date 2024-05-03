import styles from "./ViewQuestionModal.module.css";
import { ViewQuestionModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import SelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import { totalYears } from "../../../utils/constants/constants";
import DynamicTabs from "../../LVL3_Cells/Tabs/Tabs";
import { useEffect, useState } from "react";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { useForm } from "react-hook-form";

const ViewQuestionModal = ({
  open,
  handleClose,
  questionDetails,
}: ViewQuestionModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  const [tabValue, setTabValue] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    // defaultValues: {
    //   search: "",
    // },
  });

  useEffect(() => {
    if (questionDetails) {
      const decodedSolution = atob(questionDetails?.detailedSolution);

      setValue("solution", decodedSolution);
    }
  }, [questionDetails]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <div className={styles[""]}>
      <CustomModal open={open} onClose={handleClose} title="Solutions">
        <div className={styles["modal-head"]}>
          <DynamicTabs
            value={tabValue}
            onChange={handleChange}
            tabLabels={[
              localeLables?.LABEL_TEST_SOLUTION,
              localeLables?.LABEL_REASONING,
            ]}
          />
        </div>

        <div className={styles["mainBody"]}>
          {tabValue === 0 && (
            <div className={styles["questionSection"]}>
              <div>
                <Text className={styles.questionTitle}>
                  {localeText.TEXT_STATEMENT}
                </Text>
                <Text>{questionDetails?.question}</Text>
              </div>
              <Text className={styles.questionTitle}>
                {localeText.TEXT_QUESTION_SOLUTION}
              </Text>

              <QuillEditor
                name="solution"
                noHeader
                control={control}
                placeholder={
                  localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                }
              />
            </div>
          )}
          {tabValue === 1 && (
            <div className={styles["mcq"]}>
              {questionDetails?.answers?.map((answer: any, index: number) => (
                <div className={styles["mcqsDiv"]} key={index}>
                  <div className="flex items-center">
                    <p
                      className={
                        answer.isCorrect
                          ? styles.correctOption
                          : styles.incorrectOption
                      }
                    >
                      {String.fromCharCode(65 + index)}
                    </p>
                    <p className={styles.answer}>{answer.text}</p>
                  </div>
                  <div
                    className={
                      answer.isCorrect
                        ? styles.correctReason
                        : styles.incorrectReason
                    }
                  >
                    <p className={styles.optionTextLabe}>
                      {`Option ${String.fromCharCode(65 + index)}`}
                      <span className={styles.optionText}>
                        {" "}
                        {answer.reason}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default ViewQuestionModal;
