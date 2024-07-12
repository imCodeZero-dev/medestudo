import styles from "./ExploreFlashcards.module.css";
import { ExploreFlashcardsProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import { MdArrowRightAlt } from "react-icons/md";
import ImageCard from "../../LVL3_Cells/ImageCard/ImageCard";

const ExploreFlashcards = ({ allFlashcards }: ExploreFlashcardsProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.ExploreFlashcards}>
      <button className={styles.welcomeButton}>
        {localeButtons.BUTTON_EXPLORE_FLASHCARDS}
      </button>
      <div className={styles.head}>
        <Text className={styles.title}>
          {localeButtons.BUTTON_EXPLORE_FLASHCARDS}
        </Text>

        <Text
          className={styles.seeAll}
          onClick={() => navigate("/student/flashcards/explore")}
        >
          {localeButtons.BUTTON_SEE_ALL} <MdArrowRightAlt />
        </Text>
      </div>

      <div className={styles.allCards}>
        {allFlashcards?.map((cards, i) => (
          <ImageCard flashcards={cards} key={i} />
        ))}
      </div>
    </section>
  );
};

export default ExploreFlashcards;
