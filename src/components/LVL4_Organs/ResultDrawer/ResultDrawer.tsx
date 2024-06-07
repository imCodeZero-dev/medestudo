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
}: ResultDrawerProps) => {
  const { localeButtons, localeTitles, localeText, localePlaceholders } =
    useLocale();
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <Text className={styles.heading}>Test Details</Text>

        <button onClick={onClose} className={styles.closeButton}>
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
          <Button className="primary-lessHeight">
            {localeButtons?.BUTTON_VIEW_SCORE}
          </Button>
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles.content}>
          {questions.map((question: any[], index: number) => (
            <div key={index} className={styles.questionBlock}>
              <h3>Q{index + 1}</h3>
              <div className="my-6">
                <QuillEditor
                  name="question"
                  control={control}
                  noHeader
                  key={question[index]?.question}
                  readOnly
                  placeholder={
                    localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                  }
                />
                <Controller
                  name={"questionImage"}
                  control={control}
                  defaultValue=""
                  key={question[index]?.question}
                  render={({ field }) => (
                    <>
                      <img
                        className={styles["questionImage"]}
                        src={field.value}
                      />
                    </>
                  )}
                />
              </div>

              <div className={styles["mcq"]}>
                {question[index]?.answers?.map((answer: any, index: number) => (
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
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button className={styles.viewScoreButton}>View Score</button> */}
    </div>
  );
};

export default ResultDrawer;
