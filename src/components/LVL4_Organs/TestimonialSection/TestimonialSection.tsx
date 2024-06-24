import styles from "./TestimonialSection.module.css";
import { TestimonialSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";

import { dummyTestimonials } from "../../../utils/constants/constants";
import { MdArrowRightAlt } from "react-icons/md";
import Testimonial from "../../LVL3_Cells/Testimonial/Testimonial";

const TestimonialSection = ({ features }: TestimonialSectionProps) => {
  const { localeButtons, localeTitles } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.TestimonialSection}>
      <div className={styles.TestimonialSection_top}>
        <button className={styles.welcomeButton}>
          {localeButtons.BUTTON_TESTIMONIALS}
        </button>

        <Text className={styles.heading}>
          {localeTitles.TITLE_WHAT_OUR_PREFESSOR_SAYS}
        </Text>
      </div>
      <div className={styles.featureCards}>
        <Testimonial data={dummyTestimonials} />
      </div>
    </section>
  );
};

export default TestimonialSection;
