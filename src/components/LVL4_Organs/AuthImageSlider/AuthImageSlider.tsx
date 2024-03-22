import { useEffect, useState } from "react";
import styles from "./AuthImageSlider.module.css";
import { AuthImageSliderProps } from "./types";

const AuthImageSlider = ({ items }: AuthImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["slider-text"]}>
        <p>{items[currentIndex].text}</p>
      </div>
      <div className={styles["indicator"]}>
        {items.map((_, index) => (
          <span
            key={index}
            className={`${styles["indicator-dot"]} ${
              index === currentIndex ? styles["active"] : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <img
        src={items[currentIndex].image}
        alt={items[currentIndex].text}
        className={styles["slider-img"]}
      />
    </div>
  );
};

export default AuthImageSlider;
