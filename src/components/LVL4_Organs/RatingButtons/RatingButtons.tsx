import { useEffect, useState } from "react";
import styles from "./RatingButtons.module.css";
import { RatingButtonsProps } from "./types";

const RatingButtons = ({
  totalRatings,
  onRatingChange,
}: RatingButtonsProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange(rating);
  };
  return (
    <div className={styles.ratingButtons}>
      {Array.from({ length: totalRatings }, (_, index) => (
        <button
          key={index}
          className={`${styles.ratingButton} ${
            selectedRating === index + 1 ? styles.selected : ""
          }`}
          onClick={() => handleRatingClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default RatingButtons;
