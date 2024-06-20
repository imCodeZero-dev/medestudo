import React from "react";
import { ImageCardProps } from "./@types";
import styles from "./ImageCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { MdArrowRightAlt } from "react-icons/md";

const ImageCard: React.FC<ImageCardProps> = ({ flashcards }) => {
  const { localeText } = useLocale();

  return (
    <div className={styles.container}>
      <img
        className={styles.flashcardImg}
        src={flashcards?.image}
        alt="Flashcard"
      />

      <Text className={styles.flashcardTitle}>{flashcards?.title}</Text>

      <div className={styles.updatedByDiv}>
        <div className={styles.updatedByDiv_Profile}>
          <img className={styles.userImg} src={flashcards?.createdBy?.pic} />

          <Text className={styles.userName}>{flashcards?.createdBy?.name}</Text>
        </div>

        <MdArrowRightAlt />
      </div>
    </div>
  );
};

export default ImageCard;
