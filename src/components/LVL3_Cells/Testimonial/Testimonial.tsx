import React, { useEffect, useRef, useState } from "react";
import { TestimonialProps } from "./@types";
import styles from "./Testimonial.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";

const Testimonial: React.FC<TestimonialProps> = ({ data }) => {
  const { localeTitles, localeText, localeButtons } = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    if (activeIndex < 0) {
      setActiveIndex((prevInd) => prevInd - 1);
    } else {
      setActiveIndex(1);
    }
  };
  const handleNext = () => {
    if (activeIndex === data?.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prevInd) => prevInd + 1);
    }
  };
  return (
    <div className={styles.Testimonial}>
      <div className={styles.Testimonial_left}>
        <img
          className={styles.pic}
          src={data?.[activeIndex]?.pic}
          alt={data[activeIndex]?.title}
        />
      </div>
      <div className={styles.Testimonial_right}>
        <Text className={styles.msg}>{`“${data[activeIndex]?.msg}”`}</Text>

        <div className={styles.roleDiv}>
          <Text className={styles.title}>{`${data[activeIndex]?.title}`}</Text>
          <Text className={styles.role}>{localeTitles.TITLE_PROFESSOR}</Text>
        </div>

        <div className={styles.arrows}>
          <SlArrowLeftCircle size={40} onClick={() => handlePrev()} />
          <SlArrowRightCircle size={40} onClick={() => handleNext()} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
