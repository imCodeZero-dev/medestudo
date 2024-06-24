import React, { useState } from "react";
import styles from "./StudentViewFlashcard.module.css";
import { StudentViewFlashcardProps } from "./types";
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
import RatingButtons from "../RatingButtons/RatingButtons";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineZoomOutMap } from "react-icons/md";

const StudentViewFlashcard: React.FC<StudentViewFlashcardProps> = ({
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
  revealAnswer,
  setRevealAnswer,
  mode,
  handleRatingChange,
  handleViewCardModalOpen,
  custom,
  toggleBookmark,
  showHeader = true,
}) => {
  const { localeTitles, localePlaceholders, localeButtons, localeText } =
    useLocale();
  console.log("allFlashcards tags", allTags);
  const filteredTags = allTags?.map((item: any) => item.title);
  const [key, setKey] = useState(0);

  const handleEdit = (data: any) => {
    handleEditOpen && handleEditOpen(data);
    setKey((prevKey) => prevKey + 1);
  };
  const handleClose = () => {
    handleEditClose && handleEditClose();
    setKey((prevKey) => prevKey + 1);
  };
  console.log("filteredTags", filteredTags);
  return (
    <div className={styles["StudentViewFlashcard"]}>
      {loading ? (
        <div className={"min-h-[75vh] m-auto flex justify-center "}>
          <Loader />
        </div>
      ) : (
        <form
          onSubmit={onSubmitEdit && handleSubmit && handleSubmit(onSubmitEdit)}
          className={styles["form"]}
        >
          {showHeader && (
            <div className={styles["StudentViewFlashcard-head"]}>
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
          )}

          <div className={styles["StudentViewFlashcard-main"]}>
            <div className={styles["StudentViewFlashcard-mainHead"]}>
              <div className={styles["StudentViewFlashcard-mainHead-left"]}>
                <div className={styles["StudentViewFlashcard-option"]}>
                  <TbCards size={16} fill="#2A2D31" />
                  {deckDetails?.subdeck?.name}
                </div>
                <div className={styles["StudentViewFlashcard-option"]}>
                  <TbCards size={16} fill="#2A2D31" />
                  {`${localeText?.TEXT_CARDS}: ${currentFlashcardIndex + 1} / ${
                    allFlashcards?.length
                  }`}
                </div>
                {custom && (
                  <>
                    {!enableEdit ? (
                      <div
                        className={`${styles["StudentViewFlashcard-option"]} cursor-pointer`}
                        onClick={() =>
                          handleEdit(allFlashcards[currentFlashcardIndex])
                        }
                      >
                        <IoPencil size={16} fill="#2A2D31" />
                      </div>
                    ) : (
                      <div
                        className={`${styles["StudentViewFlashcard-option"]} cursor-pointer`}
                        onClick={() => handleClose()}
                      >
                        <GiReturnArrow size={16} fill="#2A2D31" />
                      </div>
                    )}
                  </>
                )}
                {custom && (
                  <>
                    <div
                      className={`${styles["StudentViewFlashcard-option"]} cursor-pointer`}
                      onClick={() =>
                        handleDeleteOpen &&
                        handleDeleteOpen(allFlashcards[currentFlashcardIndex])
                      }
                    >
                      <FaRegTrashAlt size={16} fill="#CC5200" />
                    </div>
                  </>
                )}

                {!custom && toggleBookmark && (
                  <div
                    className={`${styles["StudentViewFlashcard-option"]} cursor-pointer`}
                    onClick={() =>
                      toggleBookmark(allFlashcards[currentFlashcardIndex])
                    }
                  >
                    <BsBookmark size={16} fill="#1D1F22" />
                  </div>
                )}
                {handleViewCardModalOpen && (
                  <div
                    className={`${styles["StudentViewFlashcard-option"]} cursor-pointer`}
                    onClick={() => handleViewCardModalOpen()}
                  >
                    <MdOutlineZoomOutMap size={16} fill="#1D1F22" />
                  </div>
                )}
              </div>
              {/* {!custom && (
                <div className={styles["StudentViewFlashcard-mainHead-right"]}>
                  <Button className="primary-lessHeight">
                    {localeButtons.BUTTON_SKIP_CARD}
                  </Button>
                </div>
              )} */}
            </div>

            <div className={styles["StudentViewFlashcard-body"]}>
              <BiSolidLeftArrow
                onClick={
                  currentFlashcardIndex >= 1 && (handlePreviousFlashcard as any)
                }
                size={42}
                fill={currentFlashcardIndex >= 1 ? "#3359E4" : "gray"}
                className="cursor-pointer"
              />
              <div className={styles["StudentViewFlashcard-body-main"]}>
                <div
                  className={`${styles["StudentViewFlashcard-section"]} border-b pb-2`}
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
                <div className={styles["StudentViewFlashcard-section"]}>
                  {!custom && !revealAnswer ? (
                    <Button
                      type="button"
                      className={"primaryActive"}
                      onClick={() => setRevealAnswer(!revealAnswer)}
                    >
                      {localeButtons.BUTTON_REVEAL_THE_ANSWER}
                    </Button>
                  ) : (
                    <>
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
                      {mode === "exam" && (
                        <div className={styles["ratingSection"]}>
                          <Text className={styles["ratingText"]}>
                            {localeText.TEXT_HOW_WELL_DID_YOU_KNOW_ANS}
                          </Text>
                          <RatingButtons
                            totalRatings={5}
                            onRatingChange={handleRatingChange}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                {!enableEdit ? (
                  <div className={styles["tags"]}>
                    {tags?.map((tag: any, i) => (
                      <div
                        className="flex w-auto bg-slate-100 p-3 rounded-lg"
                        key={i}
                      >
                        <Text className={styles.tag}>#{tag?.label}</Text>
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

export default StudentViewFlashcard;
