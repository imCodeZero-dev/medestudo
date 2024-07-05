import React, { useState } from "react";
import styles from "./ViewQuestions.module.css";
import { ViewQuestionsProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { Button } from "../../LVL1_Atoms/Button";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Tag } from "../../../utils/constants/DataTypes";
import Loader from "../../LVL1_Atoms/Loader";
import Input from "../../LVL1_Atoms/Input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import ViewQuestionModal from "../ViewQuestionModal/ViewQuestionModal";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../../LVL2_Molecules/ImageWithLoader/Image";

const ViewQuestions: React.FC<ViewQuestionsProps> = ({
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
    <div className={styles["ViewQuestions"]}>
      {loading ? (
        <div className={"min-h-[75vh] m-auto flex justify-center "}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitEdit)} className={styles["form"]}>
          <div
            className={styles["ViewQuestions-main"]}
            key={allQuestion[currentIndex]?._id}
          >
            <div className={styles["ViewQuestions-main-head"]}>
              <Text className={styles["questionTitle"]}>{`Question ${
                currentIndex + 1
              }`}</Text>

              <div className="flex space-x-4">
                <div>
                  <Button
                    type="button"
                    className="primary-lessHeight"
                    // loading={loading}
                    onClick={() =>
                      navigateToEditQuestion(allQuestion[currentIndex])
                    }
                  >
                    {localeButtons?.BUTTON_EDIT}
                  </Button>
                </div>
                {/* <div>
                    <Button
                      type="button"
                      className="primaryActive-lessHeight"
                      // loading={loading}
                      // onClick={() => setCreateFlashcard(false)}
                    >
                      {localeButtons?.BUTTON_SAVE}
                    </Button>
                  </div> */}
              </div>
            </div>

            <div className="my-6">
              {/* <Text className={styles["questionTitle"]}>
                {allQuestion[currentIndex]?.question}
              </Text> */}
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
              {watch("questionImage") && (
                <>
                  <Controller
                    name={"questionImage"}
                    control={control}
                    defaultValue=""
                    key={allQuestion[currentIndex]?.questionImage}
                    render={({ field }) => (
                      <>
                        {field?.value && (
                          <ImageWithLoader
                            src={field.value}
                            alt="question Image"
                            className={styles["questionImage"]}
                          />
                        )}
                        {/* {field.value && (
                      <ImageWithLoader
                        src={field.value}
                        alt="question Image"
                        className={styles["questionImage"]}
                      />
                      )} */}
                      </>
                    )}
                  />
                </>
              )}
              {/* <Input
                control={control}
                name="question"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_EXAM_TITLE}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              /> */}
            </div>

            <div className={styles["mcq"]}>
              {allQuestion[currentIndex]?.answers?.map(
                (answer: any, index: number) => (
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
                        // <img
                        //   className={styles["answerImg"]}
                        //   src={answer.image}
                        // />
                        <ImageWithLoader
                          src={answer.image}
                          alt="answerImage"
                          className={styles["answerImg"]}
                        />
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center w-64 m-auto">
              <Button
                className="yellowButton"
                onClick={handleOpenSeeSolution}
                type="button"
              >
                {" "}
                {localeButtons.BUTTON_SEE_SOLUTION}
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

export default ViewQuestions;
