import styles from "./HomeHeader.module.css";
import { HomeHeaderProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { BiMenu } from "react-icons/bi";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { useWidth } from "../../../utils/hooks/responsiveHook";

const HomeHeader = ({
  setDrawerOpen,
  scrollToExploreFlashcards,
}: HomeHeaderProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();
  const { width } = useWidth();

  return (
    <div className={styles["HomeHeader"]}>
      <img src={logoImg} className={styles["logo"]} />

      <div className={styles["HomeHeader-buttons"]}>
        <Button
          onClick={() => {
            navigate("");
          }}
        >
          {localeButtons.BUTTON_HOME}
        </Button>
        <Button
      
          onClick={scrollToExploreFlashcards}
        >
          {localeButtons.BUTTON_FLASHCARDS}
        </Button>
        <Button
          className=""
          // className={getNavItemClassName(button.label)}
          onClick={() => {
            navigate("");
          }}
        >
          {localeButtons.BUTTON_LOGIN}
        </Button>
      </div>

      <div className={styles["HomeHeader-buttons-started"]}>
        <Button
          // className={getNavItemClassName(button.label)}
          className="roundedYellow"
          onClick={() => {
            navigate("");
          }}
        >
          {localeButtons.BUTTON_GET_STARTED}
        </Button>
      </div>

      {width < breakPoints.mlg && (
        <div>
          <Button
            onClick={() => setDrawerOpen(true)}
            // className={getNavItemClassName(button.label)}
            className="roundedYellow"
          >
            <BiMenu size={24} />
            {/* {localeButtons.BUTTON_GET_STARTED} */}
          </Button>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
