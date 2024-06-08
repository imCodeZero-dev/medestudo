import { useEffect, useState } from "react";
import styles from "./ResultDrawer.module.css";
import { ResultDrawerProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import { Button } from "../../LVL1_Atoms/Button";
import useLocale from "../../../locales";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { Controller } from "react-hook-form";

const ResultDrawer = ({
  questions,
  isOpen,
  onClose,
  control,
}: // showReasoning,
ResultDrawerProps) => {
  const [showReasoning, setShowReasoning] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  const toggleReasoning = (index: number) => {
    setShowReasoning((prev) => {
      const newReasoning = [...prev];
      newReasoning[index] = !newReasoning[index];
      return newReasoning;
    });
  };
  console.log("ResultDrawer", questions);
  const {
    localeButtons,
    localeTitles,
    localeText,
    localePlaceholders,
    localeLables,
  } = useLocale();
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <Text className={styles.heading}>Test Details</Text>

        <button onClick={() => onClose()} className={styles.closeButton}>
          ×
        </button>
      </div>

      <div className={styles.headerIndicators}>
        <div className={styles.indicators}>
          <div className={styles.indicatorDiv}>
            <span className={styles.incorrect}></span>
            <Text className={styles.indicatorText}>
              {localeText.TEXT_INCORRECT}
            </Text>
          </div>
          <div className={styles.indicatorDiv}>
            <span className={styles.correct}></span>
            <Text className={styles.indicatorText}>
              {localeText.TEXT_CORRECT}
            </Text>
          </div>
          <div className={styles.indicatorDiv}>
            <span className={styles.selected}></span>
            <Text className={styles.indicatorText}>
              {localeText.TEXT_SELECTED}
            </Text>
          </div>
        </div>

        <div className={styles.viewBtn}>
          <Button
            className="primary-lessHeight"
            type="button"
            onClick={() => onClose()}
          >
            {localeButtons?.BUTTON_VIEW_SCORE}
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          {questions.map((question: any, index: number) => (
            <div key={index} className={styles.questionBlock}>
              <div className="flex justify-between items-center">
                <h3>Q{index + 1}</h3>

                <Button
                  className={
                    showReasoning[index] ? "purpleBtn" : "secondaryBtn"
                  }
                  onClick={() => toggleReasoning(index)}
                >
                  {showReasoning
                    ? localeLables?.LABEL_HIDE_REASONING
                    : localeLables?.LABEL_SHOW_REASONING}
                </Button>
              </div>
              <div className="my-6">
                <QuillEditor
                  // name="question"
                  // name={question?.[index]?.question}
                  name={`question-${index}`}
                  control={control}
                  noHeader
                  key={question[index]?.question}
                  readOnly
                  placeholder={
                    localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                  }
                />
                <Controller
                  // name={"questionImage"}
                  // name={question?.[index]?.questionImage}
                  name={`questionImage-${index}`}
                  control={control}
                  defaultValue=""
                  key={question[index]?.question}
                  render={({ field }) => (
                    <>
                      {field.value !== "" && (
                        <img
                          className={styles["questionImage"]}
                          src={field.value}
                        />
                      )}
                    </>
                  )}
                />
              </div>
              {/* <div className={styles["mcq"]}>
                {question?.answers?.map((answer: any, index: number) => (
                  <div className={styles["mcqsDiv"]} key={index}>
                    <p
                      className={
                        answer.isCorrect
                          ? styles.correctOption
                          : styles.incorrectOption
                      }
                    >
                      {String.fromCharCode(65 + index)}
                    </p>
                    <div className={styles["ansAndImg"]}>
                      <p className={styles.answer}>{answer.text}</p>
                      {answer?.image && (
                        <img
                          className={styles["answerImg"]}
                          src={answer.image}
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
              </div> */}

              {showReasoning[index] && (
                <div className={styles["mcq"]}>
                  {question?.answers?.map((answer: any, index: number) => (
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
          ))}
        </div>
      </div>
      {/* <button className={styles.viewScoreButton}>View Score</button> */}
    </div>
  );
};

export default ResultDrawer;
