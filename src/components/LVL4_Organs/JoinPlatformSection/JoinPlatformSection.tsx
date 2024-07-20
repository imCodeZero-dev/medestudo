import styles from "./JoinPlatformSection.module.css";
import { JoinPlatformSectionProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import Text from "../../LVL1_Atoms/Text/Text";

import { MdArrowRightAlt } from "react-icons/md";
import person from "../../../assets/Images/Landing/Professor2.png";

const JoinPlatformSection = ({}: JoinPlatformSectionProps) => {
  const { localeButtons, localeTitles, localeText } = useLocale();
  const navigate = useNavigate();

  return (
    <section className={styles.JoinPlatformSection}>
      <div className={styles.JoinPlatformSection_left}>
        <Text className={styles.heading}>
          {localeTitles.TITLE_JOIN_OUR_PLATFORM}
        </Text>

        <Text className={styles.text}>
          {localeText.TEXT_DISCOVER_THE_MULTIPLE_BENIFITS}
        </Text>

        <Button className="startedBtn" onClick={() => navigate("/student")}>
          {localeButtons.BUTTON_GET_STARTED} <MdArrowRightAlt />
        </Button>
      </div>
      <div className={styles.JoinPlatformSection_right}>
        <img src={person} alt="medestudo" className={styles.img} />
      </div>
    </section>
  );
};

export default JoinPlatformSection;
