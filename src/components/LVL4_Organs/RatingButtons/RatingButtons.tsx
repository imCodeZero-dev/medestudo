import { useEffect, useState } from "react";
import styles from "./RatingButtons.module.css";
import { RatingButtonsProps } from "./types";

const RatingButtons = ({
  rated,
  totalRatings,
  onRatingChange,
  id,
  loading,
}: RatingButtonsProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(
    rated ? rated : 0
  );

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    onRatingChange && onRatingChange(rating, id);
  };
  return (
    <div className={styles.ratingButtons}>
      {Array.from({ length: totalRatings }, (_, index) => (
        <button
          key={index}
          type="button"
          disabled={loading}
          className={`${loading && "animate-pulse"} ${styles.ratingButton} ${
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
