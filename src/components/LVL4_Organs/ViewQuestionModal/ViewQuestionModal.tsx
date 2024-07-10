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
import ImageWithLoader from "../../LVL2_Molecules/ImageWithLoader/Image";

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
    defaultValues: {
      question: "",
      solution: "",
    },
  });

  useEffect(() => {
    if (questionDetails) {
      const decodedSolution = atob(questionDetails?.detailedSolution);
      const decodedQuestion = atob(questionDetails?.question);

      setValue("question", decodedQuestion);
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
                <QuillEditor
                  key={questionDetails?.question}
                  name="question"
                  noHeader
                  readOnly
                  control={control}
                  placeholder={
                    localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE
                  }
                />
                {/* <img
                  className={styles["questionImage"]}
                  src={questionDetails?.questionImage}
                /> */}
                <ImageWithLoader
                  className={styles["questionImage"]}
                  src={questionDetails?.questionImage}
                  alt=""
                />
              </div>
              <Text className={styles.questionTitle}>
                {localeText.TEXT_QUESTION_SOLUTION}
              </Text>

              <QuillEditor
                key={questionDetails?.solution}
                name="solution"
                noHeader
                readOnly
                control={control}
                placeholder={
                  localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                }
              />

              {questionDetails?.detailedSolutionImage && (
                <ImageWithLoader
                  className={styles["questionImage"]}
                  // className="h-24 w-24"
                  src={questionDetails?.detailedSolutionImage}
                  alt=""
                />
              )}
            </div>
          )}
          {tabValue === 1 && (
            <div className={styles["mcq"]}>
              {questionDetails?.answers?.map((answer: any, index: number) => (
                <div className={styles["mcqsDiv"]} key={index}>
                  <div className="flex justify-between">
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
                    {answer?.image && (
                      <ImageWithLoader
                        className="h-16 w-16"
                        src={answer?.image}
                        alt=""
                      />
                    )}
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
