import styles from "./WhyMetEstudioSection.module.css";
import { WhyMetEstudioSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import laptop from "../../../assets/Images/Landing/laptop.png";
import StudentViewFlashcard from "../StudentViewFlashcard/StudentViewFlashcard";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { flashcardData } from "../../../utils/constants/DataTypes";
// import { Tag } from "../../../utils/constants/DataTypes";

const WhyMetEstudioSection = ({}: WhyMetEstudioSectionProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [revealAnswer, setRevealAnswer] = useState(false);

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<flashcardData>({
    defaultValues: {},
  });
  const allFlashcards = [
    {
      answer:
        "PHAgY2xhc3M9InFsLWFsaWduLWNlbnRlciI+PHN0cm9uZz5UaGlzIGlzIEFuc3dlciAxPC9zdHJvbmc+PC9wPg==",
      answerImage:
        "https://res.cloudinary.com/dkzlc4bhv/image/upload/v1718367229/medestudo/bw8rp7yqqljur9hw7pqi.png",
      cardCount: 6,
      createdAt: "2024-06-14T12:13:51.493Z",
      deckId: "66685016e0c41fc32bfdec8e",
      professorId: "65eb1f49799e17997824fd42",
      question:
        "PHAgY2xhc3M9InFsLWFsaWduLWNlbnRlciI+PHN0cm9uZz5UaGlzIGlzIFF1ZXN0aW9uIDE8L3N0cm9uZz48L3A+",
      questionImage:
        "https://res.cloudinary.com/dkzlc4bhv/image/upload/v1718367229/medestudo/dkekhfwuz6uwapnxnegh.png",
      tags: ["YEEE edited", "test"],
      updatedAt: "2024-06-21T16:31:24.610Z",
      _id: "666c33ff536262b86a09167a",
    },
    {
      answer: "PHA+VGhpcyBpcyAzLjE8L3A+",
      answerImage:
        "https://res.cloudinary.com/dkzlc4bhv/image/upload/v1716481657/medestudo/ergvmrcslw40wgo4mdu0.png",
      cardCount: 1,
      createdAt: "2024-06-14T12:13:51.493Z",
      deckId: "66685016e0c41fc32bfdec8e",
      professorId: "65eb1f49799e17997824fd42",
      question: "PHA+VGhpcyBpcyAzLjE8L3A+",
      questionImage:
        "https://res.cloudinary.com/dkzlc4bhv/image/upload/v1716481656/medestudo/htt1wifbmekeht65n0y6.png",
      tags: ["test"],
      updatedAt: "2024-06-21T16:31:24.610Z",
      _id: "666c33ff536262b86a09167a",
    },
  ];

  const allTags = ["Neuro", "Cardiac", "ENT"];
  // const tags = ["Neuro", "Cardiac", "ENT"];
  const tags = [{ label: "Neuro" }, { label: "Cardiac" }, { label: "ENT" }];

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
    setRevealAnswer(false);
  };

  const handleNextFlashcard = () => {
    // setCurrentFlashcardIndex((prevIndex) => {
    //   const nextIndex = prevIndex + 1;

    //   return nextIndex < flashcards.length ? nextIndex : prevIndex;
    // });
    setCurrentFlashcardIndex((prevIndex) =>
      allFlashcards?.length !== prevIndex ? prevIndex + 1 : prevIndex
    );
    setRevealAnswer(false);
  };
  useEffect(() => {
    // Set initial values when component mounts or currentFlashcardIndex changes
    if (allFlashcards[currentFlashcardIndex]) {
      const { question, answer, tags, questionImage, answerImage } =
        allFlashcards[currentFlashcardIndex];
      try {
        const decodedQuestion = atob(question);
        const decodedAnswer = atob(answer);
        setValue("question", decodedQuestion);
        setValue("answer", decodedAnswer);
        setValue("questionImage", questionImage);
        setValue("answerImage", answerImage);
        // setValue("new_questionImage", questionImage);
        // setValue("new_answerImage", answerImage);
        if (tags && tags.length > 0) {
          const filteredTags: any = tags?.map((item: any) => ({
            title: item,
            value: item,
            label: item,
          }));
          setValue("tags", filteredTags);
        } else {
          setValue("tags", []);
        }
      } catch (error) {
        console.error("Error decoding base64 string:", error);
      }
    }
  }, [currentFlashcardIndex]);
  // const tags = [
  //   {
  //     title: "Neuro",
  //     label: "Neuro",
  //     value: "Neuro",
  //   },
  //   { title: "Cardiac", label: "Cardiac", value: "Cardiac" },
  //   { title: "ENT", label: "ENT", value: "ENT" },
  // ];

  return (
    <>
      <section className={styles.WhyMetEstudioSection}>
        <button className={styles.welcomeButton}>
          {localeButtons.BUTTON_WHY_MEDESTUDO}
        </button>

        <Text className={styles.heading}>
          {localeTitles.TITLE_THE_BEST_IN_THE_BUSINESS}
        </Text>
        <Text className={styles.text}>
          Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem
          lorem, tempus id condimentum
        </Text>

        <img className={styles.laptop} src={laptop} alt="medestudio" />
      </section>

      <section className={styles.WhyMetEstudioSection}>
        <button className={styles.welcomeButton}>
          {localeButtons.BUTTON_TRY_NOW}
        </button>

        <Text className={styles.heading}>
          {localeTitles.TITLE_TRY_OUR_WAY_OF_LEARNING}
        </Text>
        <div className={styles.flashcardBody}>
          <StudentViewFlashcard
            // handleViewCardModalOpen={handleViewCardModalOpen}
            currentFlashcardIndex={currentFlashcardIndex}
            allFlashcards={allFlashcards}
            control={control}
            allTags={allTags}
            tags={tags}
            handleNextFlashcard={handleNextFlashcard}
            handlePreviousFlashcard={handlePreviousFlashcard}
            // handleSubmit={handleSubmit}
            loading={false}
            custom={false}
            mode="exam"
            // toggleBookmark={toggleBookmark}
            revealAnswer={revealAnswer}
            setRevealAnswer={setRevealAnswer}
            showHeader={false}
          />
        </div>
      </section>
    </>
  );
};

export default WhyMetEstudioSection;
