import React, { useEffect, useRef } from "react";
import { ReviewCardProps } from "./@types";
import styles from "./ReviewCard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { useDropdown } from "../../../utils/hooks/helper";

const ReviewCard: React.FC<ReviewCardProps> = ({
  rating,
  review,
  authorName,
  authorRole,
  authorAvatar,
}) => {
  const { localeText } = useLocale();

  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
      <p className={styles.review}>{review}</p>
      <div className={styles.author}>
        <img src={authorAvatar} alt={authorName} className={styles.avatar} />
        <div>
          <div className={styles.authorName}>{authorName}</div>
          <div className={styles.authorRole}>{authorRole}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
