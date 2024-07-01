import styles from "./ViewCardModal.module.css";
import { ViewCardModalProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { Controller } from "react-hook-form";
import RatingButtons from "../RatingButtons/RatingButtons";

const ViewCardModal = ({
  open,
  handleClose,

  control,

  currentFlashcardIndex,
  handlePreviousFlashcard,
  revealAnswer,
  setRevealAnswer,
  mode,
  handleRatingChange,
  tags,
  allFlashcards,
  handleNextFlashcard,
  key,
}: ViewCardModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles["ViewCardModal"]}>
      <CustomModal
        open={open}
        onClose={handleClose}
        width={"80vw"}
        title="Flashcard"
      >
        <div className={styles["ViewCardModal-body"]}>
          <BiSolidLeftArrow
            onClick={
              currentFlashcardIndex >= 1 && (handlePreviousFlashcard as any)
            }
            size={42}
            fill={currentFlashcardIndex >= 1 ? "#3359E4" : "gray"}
            className="cursor-pointer"
          />
          <div className={styles["ViewCardModal-body-main"]}>
            <div className={styles["tags"]}>
              {tags?.map((tag: any, i: number) => (
                <div
                  className="flex w-auto bg-slate-100 p-3 rounded-lg"
                  key={i}
                >
                  <Text className={styles.tag}>{tag?.label}</Text>
                </div>
              ))}
            </div>
            <div className={`${styles["ViewCardModal-section"]} border-b pb-2`}>
              <Text className={styles.heading2}>Q</Text>
              <QuillEditor
                key={key}
                readOnly={true}
                noHeader={true}
                name="question"
                control={control}
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE}
              />

              <Controller
                name={"questionImage"}
                control={control}
                defaultValue=""
                // key={allFlashcards[currentFlashcardIndex]?._id}
                render={({ field }) => (
                  <>
                    {field?.value && (
                      <img
                        className={styles["questionImage"]}
                        src={field.value}
                      />
                    )}
                  </>
                )}
              />
            </div>
            <div className={styles["ViewCardModal-section"]}>
              {!revealAnswer ? (
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
                    readOnly={true}
                    noHeader={true}
                    name="answer"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_ANSWER_HERE
                    }
                  />

                  <Controller
                    name={"answerImage"}
                    control={control}
                    defaultValue=""
                    // key={allFlashcards[currentFlashcardIndex]?._id}
                    render={({ field }) => (
                      <>
                        {field?.value && (
                          <img
                            className={styles["questionImage"]}
                            src={field.value}
                          />
                        )}
                      </>
                    )}
                  />

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
          </div>

          {allFlashcards && (
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
          )}
        </div>
      </CustomModal>
    </div>
  );
};

export default ViewCardModal;
