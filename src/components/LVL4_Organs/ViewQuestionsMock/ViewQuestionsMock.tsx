import React, { useState } from "react";
import styles from "./ViewQuestionsMock.module.css";
import { ViewQuestionsMockProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { Button } from "../../LVL1_Atoms/Button";
import { Controller } from "react-hook-form";
import Loader from "../../LVL1_Atoms/Loader";
import Input from "../../LVL1_Atoms/Input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import ViewQuestionModal from "../ViewQuestionModal/ViewQuestionModal";
import { useNavigate } from "react-router-dom";

const ViewQuestionsMock: React.FC<ViewQuestionsMockProps> = ({
  control,
  allQuestion,
  handleNext,
  handlePrevious,
  currentIndex,
  handleDeleteOpen,
  enableEdit,
  handleEditClose,
  handleEditOpen,
  onSubmitEdit,
  handleSubmit,
  loading,
  editLoading,
  watch,
  revealedAnswer,
  selectAnswer,
  selectedAnswer,
  respondToNext,
  finishExam,
}) => {
  // console.log("allQuestion", allQuestion[currentIndex]?.question);
  // console.log("allQuestion watch", watch("questionImage"));
  const { localeTitles, localePlaceholders, localeButtons, localeText } =
    useLocale();
  // console.log("allTags", allTags);
  const navigate = useNavigate();
  const [key, setKey] = useState(0);

  const navigateToEditQuestion = (exam: any) => {
    // console.log("navigateToEditQuestion", exam);
    navigate(`/professor/exams/exam/question`, {
      state: { ...exam, status: "edit" },
    });
  };

  const [viewSeeSolution, setViewSeeSolution] = useState(false);
  const handleOpenSeeSolution = () => {
    setViewSeeSolution(true);
  };

  const handleCloseSeeSolution = () => {
    setViewSeeSolution(false);
  };
  // console.log("filteredTags", filteredTags);
  return (
    <div className={styles["ViewQuestionsMock"]}>
      {loading ? (
        <div className={"min-h-[75vh] m-auto flex justify-center "}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitEdit)} className={styles["form"]}>
          <div
            className={styles["ViewQuestionsMock-main"]}
            key={allQuestion[currentIndex]?._id}
          >
            <div className={styles["ViewQuestionsMock-main-head"]}>
              <Text className={styles["questionTitle"]}>{`Question ${
                currentIndex + 1
              }`}</Text>

              <div className="flex space-x-4">
                <div>
                  <Button
                    type="button"
                    className="yellowButton-lessHeight"
                    // loading={loading}
                    onClick={() => finishExam()}
                  >
                    {localeButtons?.BUTTON_FINISH_EXAM}
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    className="primary-lessHeight"
                    // loading={loading}
                    onClick={
                      currentIndex !== allQuestion?.length - 1 &&
                      (handleNext as any)
                    }
                  >
                    {localeButtons?.BUTTON_SKIP_QUESTION}
                  </Button>
                </div>
              </div>
            </div>

            <div className="my-6">
              <QuillEditor
                name="question"
                control={control}
                noHeader
                key={allQuestion[currentIndex]?.question}
                readOnly
                placeholder={
                  localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                }
              />
              <Controller
                name={"questionImage"}
                control={control}
                defaultValue=""
                key={allQuestion[currentIndex]?.question}
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
              {allQuestion[currentIndex]?.answers?.map(
                (answer: any, index: number) => (
                  <div className={styles["mcqsDiv"]} key={index}>
                    {revealedAnswer ? (
                      <p
                        className={
                          answer.isCorrect && revealedAnswer
                            ? styles.correctOption
                            : styles.incorrectOption
                        }
                      >
                        {String.fromCharCode(65 + index)}
                      </p>
                    ) : (
                      <p
                        onClick={() => selectAnswer(answer)}
                        className={
                          selectedAnswer === answer
                            ? styles.selectedOption
                            : styles.notSelectedOption
                        }
                      >
                        {String.fromCharCode(65 + index)}
                      </p>
                    )}
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
                )
              )}
            </div>

            <div className="flex items-center w-64 m-auto">
              <Button
                disabled={!selectedAnswer}
                className="primaryActive"
                onClick={respondToNext}
                type="button"
              >
                {" "}
                {localeButtons.BUTTON_TO_RESPOND}
              </Button>
            </div>

            <div className="flex justify-center mt-5">
              <div className={styles["arrowBtnDiv"]}>
                <IoIosArrowRoundBack
                  onClick={currentIndex >= 1 && (handlePrevious as any)}
                  size={42}
                  fill={currentIndex >= 1 ? "#3359E4" : "gray"}
                  className="cursor-pointer"
                />
              </div>
              <div className={styles["arrowBtnDiv"]}>
                <IoIosArrowRoundForward
                  onClick={
                    currentIndex !== allQuestion?.length - 1 &&
                    (handleNext as any)
                  }
                  size={42}
                  fill={
                    currentIndex !== allQuestion?.length - 1
                      ? "#3359E4"
                      : "gray"
                  }
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      <ViewQuestionModal
        questionDetails={allQuestion[currentIndex]}
        open={viewSeeSolution}
        handleClose={handleCloseSeeSolution}
      />
    </div>
  );
};

export default ViewQuestionsMock;
