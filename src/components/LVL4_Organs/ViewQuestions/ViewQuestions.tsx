import React, { useState } from "react";
import styles from "./ViewQuestions.module.css";
import { ViewQuestionsProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import TagInput from "../../LVL1_Atoms/Input/TagInput";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from "../../LVL1_Atoms/Button";
import { TbCards } from "react-icons/tb";
import { IoPencil } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Tag } from "../../../utils/constants/DataTypes";
import Loader from "../../LVL1_Atoms/Loader";
import Input from "../../LVL1_Atoms/Input";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

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
}) => {
  console.log("allQuestion", allQuestion);
  const { localeTitles, localePlaceholders, localeButtons, localeText } =
    useLocale();
  // console.log("allTags", allTags);
  const [key, setKey] = useState(0);

  const handleEdit = (data: any) => {
    handleEditOpen(data);
    setKey((prevKey) => prevKey + 1);
  };
  const handleClose = () => {
    handleEditClose();
    setKey((prevKey) => prevKey + 1);
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
          <div className={styles["ViewQuestions-head"]}>
            <div className={styles["headLeft"]}>
              <Text className={styles.title}>
                {localeTitles.TITLE_FLASHCARD}
              </Text>
              <div>
                <Text className={styles.heading}>
                  {localeTitles.TITLE_NEW_CHAPTER}
                </Text>
              </div>
            </div>
            <div className={styles["headRight"]}>
              {enableEdit && (
                <Button
                  type="submit"
                  className="primaryTab"
                  loading={editLoading}
                >
                  {localeButtons?.BUTTON_SAVE}
                </Button>
              )}
            </div>
          </div>
          <div className={styles["ViewQuestions-main"]}>
            <div className={styles["ViewQuestions-main-head"]}>
              <Text className={styles["questionTitle"]}>{`Question ${
                currentIndex + 1
              }`}</Text>

              <div className="flex space-x-4">
                <div>
                  <Button
                    type="button"
                    className="primary"
                    // loading={loading}
                    // onClick={() => setCreateFlashcard(false)}
                  >
                    {localeButtons?.BUTTON_EDIT}
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    className="primaryActive"
                    // loading={loading}
                    // onClick={() => setCreateFlashcard(false)}
                  >
                    {localeButtons?.BUTTON_SAVE}
                  </Button>
                </div>
              </div>
            </div>

            <div className="my-6">
              <Text className={styles["questionTitle"]}>
                {allQuestion[currentIndex]?.question}
              </Text>

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
                    <p className={styles.reason}>{answer.reason}</p>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center w-64 m-auto">
              <Button className="yellowButton">
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
    </div>
  );
};

export default ViewQuestions;
