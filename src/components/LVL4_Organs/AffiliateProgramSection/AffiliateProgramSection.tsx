import styles from "./AffiliateProgramSection.module.css";
import { AffiliateProgramSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";

import { MdArrowRightAlt } from "react-icons/md";
import affiliateImage from "../../../assets/Images/Landing/Rectangle 70.png";

const AffiliateProgramSection = ({}: AffiliateProgramSectionProps) => {
  const { localeButtons, localeTitles,localeText } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.AffiliateProgramSection}>
      <div className={styles.AffiliateProgramSection_left}>
        <img src={affiliateImage} alt="medestudo" className={styles.img} />
      </div>
      <div className={styles.AffiliateProgramSection_right}>
        <button className={styles.welcomeButton}>
          {localeButtons.BUTTON_OUR_AFFILIATE_PROGRAM}
        </button>
        <div>
          <Text className={styles.heading}>
            {localeTitles.TITLE_AFFILIATE_PROGRAM}
          </Text>

          <Text className={styles.text}>
            {localeText.TEXT_ARE_YOU_PASSIONATE_ABOUT}
          </Text>
        </div>

        <Button className="startedBtn" onClick={() => navigate("/student")}>
          {localeButtons.BUTTON_JOIN_NOW} <MdArrowRightAlt />
        </Button>
      </div>
    </section>
  );
};

export default AffiliateProgramSection;
