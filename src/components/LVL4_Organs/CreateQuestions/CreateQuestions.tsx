import styles from "./CreateQuestions.module.css";
import { CreateQuestionsProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import { MdDelete, MdOutlineKey } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import QuillEditor from "../../LVL3_Cells/QuillEditor/QuillEditor";
import { IoCloseCircleOutline } from "react-icons/io5";
import SearchableInput from "../../LVL1_Atoms/Input/TagInput";
import TagInput from "../../LVL1_Atoms/Input/TagInput";

const CreateQuestions = ({
  handleSubmit,
  onSubmit,
  control,
  loading,
  setCreateFlashcard,
  allTags,
  deckData,setValue
}: CreateQuestionsProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  // console.log("allTags", allTags);
  return (
    <div className={styles["CreateQuestions"]}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["CreateQuestions-head"]}>
          <div className={styles["headLeft"]}>
            <Text className={styles.title}>{localeTitles.TITLE_FLASHCARD}</Text>
            <div>
              <Text className={styles.heading}>
                {deckData?.name}
                {/* {localeTitles.TITLE_NEW_CHAPTER} */}
              </Text>
            </div>
          </div>
          <div className={styles["headRight"]}>
            <Button
              type="submit"
              className="primaryTab"
              loading={loading}
              onClick={() => setCreateFlashcard(false)}
            >
              {localeButtons?.BUTTON_SAVE}
            </Button>
          </div>
        </div>
        <div className={styles["CreateQuestions-main"]}>
          <div className={styles["CreateQuestions-mainHead"]}>
            <Text>Question 1</Text>
            <div>
              <Button
                className="roundedYellow"
                leftIcon={<IoCloseCircleOutline size={16} />}
              >
                {localeButtons?.BUTTON_DELETE}
              </Button>
            </div>
          </div>

          <div className={styles["CreateQuestions-section"]}>
            <QuillEditor
              name="question"
              control={control}
              setValue={setValue}
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE}

            />
          </div>
          <div className={styles["CreateQuestions-section"]}>
            <QuillEditor
                          setValue={setValue}

              name="answer"
              control={control}
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_ANSWER_HERE}
            />
          </div>
          <div className={styles["inputDiv"]}>
            <TagInput allTags={allTags} control={control} />
          </div>
        </div>{" "}
      </form>
    </div>
  );
};

export default CreateQuestions;
