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
import SearchableInput from "../../LVL1_Atoms/Input/SearchableInput";

const CreateQuestions = ({
  handleSubmit,
  onSubmit,
  control,
  loading,
  setCreateFlashcard,
}: CreateQuestionsProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
  ];

  return (
    <div className={styles["CreateQuestions"]}>
      <div className={styles["CreateQuestions-head"]}>
        <div className={styles["headLeft"]}>
          <Text className={styles.title}>{localeTitles.TITLE_FLASHCARD}</Text>
          <div>
            <Text className={styles.heading}>
              {localeTitles.TITLE_NEW_CHAPTER}
            </Text>
          </div>
        </div>
        <div className={styles["headRight"]}>
          <Button
            className="secondaryBtn"
            onClick={() => setCreateFlashcard(false)}
          >
            {localeButtons?.BUTTON_CANCEL}
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

        <div className={styles["CreateQuestions-main"]}>
          <QuillEditor
            name="question"
            control={control}
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE}
          />
        </div>
        <div className={styles["CreateQuestions-main"]}>
          <QuillEditor
            name="answer"
            control={control}
            placeholder={localePlaceholders.PLACEHOLDER_ENTER_ANSWER_HERE}
          />
        </div>
        <div className={styles["inputDiv"]}>
          <Input
            // label={localeLables?.LABEL_NAME}
            control={control}
            name="tag"
            placeholder={localePlaceholders.PLACEHOLDER_SEARCH}
            preDefinedClassName="lesserHeight"
            preDefinedWrapClassName="inputField-wrap"
            type="text"
          />

          {/* <SearchableInput
          name="searchField"
          options={options}
          control={control}
        /> */}
        </div>
      </div>
    </div>
  );
};

export default CreateQuestions;
