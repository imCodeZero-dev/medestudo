import styles from "./ReviewSection.module.css";
import { ReviewSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";
import vector from "../../../assets/Images/Landing/Group 12.png";
import ReviewCard from "../../LVL3_Cells/ReviewCard/ReviewCard";
import { useEffect, useState } from "react";

const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (reviews.length / 2));
    }, 5000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [reviews?.length]);

  return (
    <section className={styles.ReviewSection}>
      <div className={styles.ReviewSection_goals}>
        <div className={styles.ReviewSection_goals_top}>
          <Text className={styles.title}>
            {localeTitles?.TITLE_TRUSTED_BY_MIILIONS}
          </Text>
          <Text className={styles.text}>
            Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem
            lorem, tempus id condimentum .
          </Text>
        </div>

        <div className={styles.ReviewSection_goals_bottom}>
          <div className="contents items-center ">
            <img src={vector} className={styles.vectorImg} />
            <Text className={styles.percentage}>90%</Text>
          </div>
          <div className={styles.line} />
          <Text className={styles.textsm}>
            Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem
            lorem, tempus id condimentum .
          </Text>
        </div>
      </div>
      <div className={styles.ReviewSection_reviews}>
        <div
          className={styles.reviewCards}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {reviews.map((review, i) => (
            <div className={styles.reviewCard} key={i}>
              <ReviewCard {...review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
