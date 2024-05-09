import React, { useState } from "react";
import styles from "./ViewFlashcards.module.css";
import { ViewFlashcardsProps } from "./types";
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
import ImageDropzone from "../../LVL2_Molecules/ImageUploader/ImageDropzone";

const ViewFlashcards: React.FC<ViewFlashcardsProps> = ({
  control,
  allTags,
  allFlashcards,
  handleNextFlashcard,
  handlePreviousFlashcard,
  currentFlashcardIndex,
  handleDeleteOpen,
  enableEdit,
  handleEditClose,
  handleEditOpen,
  tags,
  onSubmitEdit,
  handleSubmit,
  loading,
  editLoading,
  setValue,
  deckDetails,
}) => {
  const { localeTitles, localePlaceholders, localeButtons, localeText } =
    useLocale();
  console.log("allFlashcards", allFlashcards);
  const filteredTags = allTags?.map((item: any) => item.title);
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
    <div className={styles["ViewFlashcards"]}>
      {loading ? (
        <div className={"min-h-[75vh] m-auto flex justify-center "}>
          <Loader />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmitEdit)} className={styles["form"]}>
          <div className={styles["ViewFlashcards-head"]}>
            <div className={styles["headLeft"]}>
              <Text className={styles.title}>
                {localeTitles.TITLE_FLASHCARD}
              </Text>
              <div>
                <Text className={styles.heading}>
                  {deckDetails?.classId?.deckId?.name}
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
          <div className={styles["ViewFlashcards-main"]}>
            <div className={styles["ViewFlashcards-mainHead"]}>
              <div className={styles["ViewFlashcards-option"]}>
                <TbCards size={16} fill="#2A2D31" />
                {deckDetails?.subdeck?.name}
              </div>
              <div className={styles["ViewFlashcards-option"]}>
                <TbCards size={16} fill="#2A2D31" />
                {`${localeText?.TEXT_CARDS}: ${currentFlashcardIndex + 1} / ${
                  allFlashcards?.length
                }`}
              </div>
              {!enableEdit ? (
                <div
                  className={`${styles["ViewFlashcards-option"]} cursor-pointer`}
                  onClick={() =>
                    handleEdit(allFlashcards[currentFlashcardIndex])
                  }
                >
                  <IoPencil size={16} fill="#2A2D31" />
                </div>
              ) : (
                <div
                  className={`${styles["ViewFlashcards-option"]} cursor-pointer`}
                  onClick={() => handleClose()}
                >
                  <GiReturnArrow size={16} fill="#2A2D31" />
                </div>
              )}
              <div
                className={`${styles["ViewFlashcards-option"]} cursor-pointer`}
                onClick={() =>
                  handleDeleteOpen(allFlashcards[currentFlashcardIndex])
                }
              >
                <FaRegTrashAlt size={16} fill="#CC5200" />
              </div>
            </div>

            <div className={styles["ViewFlashcards-body"]}>
              <BiSolidLeftArrow
                onClick={
                  currentFlashcardIndex >= 1 && (handlePreviousFlashcard as any)
                }
                size={42}
                fill={currentFlashcardIndex >= 1 ? "#3359E4" : "gray"}
                className="cursor-pointer"
              />
              <div className={styles["ViewFlashcards-body-main"]}>
                <div
                  className={`${styles["ViewFlashcards-section"]} border-b pb-2`}
                >
                  <Text className={styles.heading2}>Q</Text>
                  <QuillEditor
                    key={key}
                    readOnly={!enableEdit}
                    noHeader={!enableEdit}
                    name="question"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE
                    }
                  />
                  {enableEdit && (
                    <Controller
                      name={"new_questionImage"}
                      control={control}
                      defaultValue=""
                      // key={allFlashcards[currentFlashcardIndex]?._id}
                      render={({ field }) => (
                        <>
                          <ImageDropzone
                            setValue={setValue}
                            control={control}
                            name={`new_questionImage`}
                          />
                        </>
                      )}
                    />
                  )}
                  {!enableEdit && (
                    <Controller
                      name={"questionImage"}
                      control={control}
                      defaultValue=""
                      // key={allFlashcards[currentFlashcardIndex]?._id}
                      render={({ field }) => (
                        <>
                          <img
                            className={styles["questionImage"]}
                            src={field.value}
                          />
                        </>
                      )}
                    />
                  )}
                </div>
                <div className={styles["ViewFlashcards-section"]}>
                  <Text className={styles.heading2}>A</Text>
                  <QuillEditor
                    key={key}
                    readOnly={!enableEdit}
                    noHeader={!enableEdit}
                    name="answer"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_ANSWER_HERE
                    }
                  />
                  {enableEdit && (
                    <Controller
                      name={"new_answerImage"}
                      control={control}
                      defaultValue=""
                      // key={allFlashcards[currentFlashcardIndex]?._id}
                      render={({ field }) => (
                        <>
                          <ImageDropzone
                            setValue={setValue}
                            control={control}
                            name={`new_answerImage`}
                          />
                        </>
                      )}
                    />
                  )}
                  {!enableEdit && (
                    <Controller
                      name={"answerImage"}
                      control={control}
                      defaultValue=""
                      // key={allFlashcards[currentFlashcardIndex]?._id}
                      render={({ field }) => (
                        <>
                          <img
                            className={styles["questionImage"]}
                            src={field.value}
                          />
                        </>
                      )}
                    />
                  )}
                </div>
                {!enableEdit ? (
                  <div className={styles["tags"]}>
                    {tags?.map((tag: any, i) => (
                      <div
                        className="flex w-auto bg-slate-200 p-3 rounded-lg"
                        key={i}
                      >
                        <Text className={styles.tag}>{tag?.label}</Text>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles["inputDiv"]}>
                    <Controller
                      name="tags"
                      control={control}
                      // defaultValue={[]}
                      render={({ field }) => (
                        <Select
                          isMulti
                          options={filteredTags?.map((tag) => ({
                            value: tag,
                            label: tag,
                          }))}
                          value={field?.value}
                          onChange={(selectedTags: any) =>
                            field.onChange(selectedTags)
                          }
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <div>
                <BiSolidRightArrow
                  onClick={
                    currentFlashcardIndex !== allFlashcards?.length - 1 &&
                    (handleNextFlashcard as any)
                  }
                  size={42}
                  fill={
                    currentFlashcardIndex !== allFlashcards?.length - 1
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

export default ViewFlashcards;
