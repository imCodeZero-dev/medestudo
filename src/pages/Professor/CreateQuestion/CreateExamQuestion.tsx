import styles from "./CreateExamQuestion.module.css";
import { CreateExamQuestionProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";
import { useCreateExamQuestion } from "./hook";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";
import { useEffect, useState } from "react";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import Loader from "../../../components/LVL1_Atoms/Loader";
import TagInput from "../../../components/LVL1_Atoms/Input/TagInput";
import QuillEditor from "../../../components/LVL3_Cells/QuillEditor/QuillEditor";
import { Controller } from "react-hook-form";
import ImageDropzone from "../../../components/LVL2_Molecules/ImageUploader/ImageDropzone";
import Input from "../../../components/LVL1_Atoms/Input";
import { ErrorMessage } from "../../../components/LVL1_Atoms/ErrorMessage";

const CreateExamQuestion = ({}: CreateExamQuestionProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const location = useLocation();
  const examId = location?.state;

  const {
    control,
    handleSubmit,
    watch,
    onSubmitCreate,
    setValue,
    examsDetailsLoading,
    examsDetails,
    errors,
    allTags,
    modifiedSubjects,
    createLoading,
    onSubmitEditQuestion,
  } = useCreateExamQuestion();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText, localePlaceholders } = useLocale();
  const [answers, setAnswers] = useState([
    { isCorrect: false, text: "", reason: "", image: null },
    { isCorrect: false, text: "", reason: "", image: null },
    { isCorrect: false, text: "", reason: "", image: null },
    { isCorrect: false, text: "", reason: "", image: null },
    { isCorrect: false, text: "", reason: "", image: null },
  ]);

  console.log("modifiedSubjects", modifiedSubjects);
  const handleIsCorrectChange = (index: number) => {
    answers.forEach((answer, i) => {
      if (i !== index) {
        setValue(`answers[${i}].isCorrect`, false);
      }
    });
  };
  return (
    <HomeLayout>
      <div className={styles["CreateExamQuestion"]}>
        <div className={styles["CreateExamQuestion-main"]}>
          {examsDetailsLoading ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(
                examId?.status === "create"
                  ? onSubmitCreate
                  : onSubmitEditQuestion
              )}
              className={styles["form"]}
            >
              <div className={styles["CreateExamQuestion-main-inner"]}>
                <div className={styles["main-inner-left"]}>
                  <div className={"flex space-x-2 items-center mb-2"}>
                    <Text className={styles["title"]}>
                      {`${examsDetails?.title} `} 
                    </Text>
                  </div>
                </div>
                <div className={styles["main-inner-right"]}>
                  {/* <Button
                    className="yellowButton-lessHeight"
                    onClick={() => openDeleteExamModal(examDetails)}
                  >
                    {localeButtons?.BUTTON_DELETE}
                  </Button> */}
                  {/* <Button
                    className="primaryActive-lessHeight"
                    type="submit"
                    loading={createLoading}
                  >
                    {localeButtons?.BUTTON_SAVE}
                  </Button> */}
                </div>
              </div>
              <div className={styles["CreateExamQuestion-main-questions"]}>
                <div className="flex justify-between space-x-6">
                  <div className={styles["inputDiv"]}>
                    <TagInput
                      name="subjects"
                      allTags={modifiedSubjects}
                      control={control}
                      placeholder={"Select Subjects"}
                    />
                  </div>
                  <div className={styles["inputDiv"]}>
                    <TagInput
                      name="tags"
                      allTags={allTags}
                      control={control}
                      placeholder={"Select Tags"}
                    />
                  </div>
                </div>
                <div className={styles["CreateExamQuestions-section"]}>
                  <div className="my-4">
                    <Text className={styles.subHeading}>
                      {localeTitles.TITLE_ENTER_QUESTION}
                    </Text>
                    <div className={styles["questionDiv"]}>
                      <Input
                        control={control}
                        name="question"
                        placeholder={
                          localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE
                        }
                        preDefinedClassName="inputField"
                        preDefinedWrapClassName="inputField-wrap"
                        type="text"
                      />

                      <div className={styles["ansAndReason-img"]}>
                        <Controller
                          name={`questionImage`}
                          control={control}
                          defaultValue={null}
                          render={({ field }) => (
                            <ImageDropzone
                              setValue={setValue}
                              control={control}
                              name={`questionImage`}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <QuillEditor
                    name="question"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_QUESTION_HERE
                    }
                  /> */}
                </div>

                <div className={styles["CreateExamQuestions-section"]}>
                  <Text className={styles.subHeading}>
                    {localeTitles.TITLE_ENTER_ANS_AND_SELECT_THE_RIGHT_ANS}
                  </Text>
                  <div className={styles["ansDiv"]}>
                    {answers.map((answer, index) => (
                      <div className={styles.ansAndReason} key={index}>
                        <div className={styles["ansAndReason-ans"]}>
                          <Controller
                            name={`answers[${index}].isCorrect`}
                            control={control}
                            defaultValue={false}
                            render={({ field, formState: { errors } }) => (
                              <>
                                <input
                                  type="checkbox"
                                  id={`checkbox_${index}`}
                                  checked={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.checked);
                                    if (e.target.checked) {
                                      handleIsCorrectChange(index);
                                    }
                                  }}
                                />
                                {errors && (
                                  <ErrorMessage
                                    errors={
                                      (errors as any)?.answers?.[index]
                                        ?.isCorrect?.message
                                    }
                                  />
                                )}
                              </>
                            )}
                          />
                          <Controller
                            name={`answers[${index}].text`}
                            control={control}
                            defaultValue=""
                            render={({ field, formState: { errors } }) => (
                              <>
                                <input
                                  className={styles.inputField}
                                  type="text"
                                  placeholder="Enter answer"
                                  {...field}
                                />
                                {errors && (
                                  <ErrorMessage
                                    errors={
                                      (errors as any)?.answers?.[index]?.text
                                        ?.message
                                    }
                                  />
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className={styles["ansAndReason-reason"]}>
                          <Controller
                            name={`answers[${index}].reason`}
                            control={control}
                            defaultValue=""
                            render={({ field, formState: { errors } }) => (
                              <>
                                <textarea
                                  className={styles.inputField}
                                  placeholder="Enter reason"
                                  {...field}
                                />
                                {errors && (
                                  <ErrorMessage
                                    errors={
                                      (errors as any)?.answers?.[index]?.reason
                                        ?.message
                                    }
                                  />
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className={styles["ansAndReason-img"]}>
                          <Controller
                            name={`answers[${index}].image`}
                            control={control}
                            defaultValue={null}
                            render={({ field }) => (
                              <ImageDropzone
                                setValue={setValue}
                                control={control}
                                name={`answers[${index}].image`}
                              />
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles["CreateExamQuestions-section"]}>
                  <Text className={styles.subHeading}>
                    {localeTitles.TITLE_SOLUTION_FOR_THE_QUESTION}
                  </Text>
                  <QuillEditor
                    name="solution"
                    control={control}
                    placeholder={
                      localePlaceholders.PLACEHOLDER_ENTER_DETAILED_SOLUTION_HERE
                    }
                  />
                </div>
              </div>
              <div className="w-48 mx-auto">
                <Button
                  className="primaryActive"
                  loading={createLoading}
                  onSubmit={handleSubmit(
                    examId?.status === "create"
                      ? onSubmitCreate
                      : onSubmitEditQuestion
                  )}
                >
                  {examId?.status === "create"
                    ? localeButtons?.BUTTON_ADD_QUESTION
                    : localeButtons.BUTTON_EDIT}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

export default function CreateExamQuestionServices() {
  return (
    <ProfessorRoutes>
      <CreateExamQuestion />
    </ProfessorRoutes>
  );
}
