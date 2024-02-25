import { useEffect, useState } from "react";
import styles from "./AuthImageSlider.module.css";
import { AuthImageSliderProps } from "./types";

const AuthImageSlider = ({ items }: AuthImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("items", items);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Change the duration as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [items.length]);

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };
  return (
    <div className={styles["image-carousel"]}>
      {/* <img src={items[0]?.image} /> */}
      <div className={styles["carousel-container"]}>
        {items.map((item, index) => (
          <div
            key={index}
            className={styles["carousel-item"]}
            style={{
              transform: `translateX(-${100 * (currentIndex - index)}%)`,
            }}
          >
            <img
              src={item.image}
              alt={`carousel-${index}`}
              className={styles["carousel-image"]}
            />
          </div>
        ))}
      </div>

      <div className="indicators">
        {items.map((_, index) => (
          <span
            key={index}
            className={`indicator ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>

      <div className={styles["carousel-text"]}>
        <p>{items[currentIndex].text}</p>
      </div>
    </div>
  );
};

export default AuthImageSlider;
