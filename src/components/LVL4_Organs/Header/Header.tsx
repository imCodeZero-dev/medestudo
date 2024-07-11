import styles from "./Header.module.css";
import { HeaderProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { BiMenu } from "react-icons/bi";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { scrollToExploreFlashcards } from "../../../utils/hooks/helper";
import LanguageDropdown from "../../LVL3_Cells/LangaugeDropdown/LangaugeDropdown";

const Header = ({ showSkip, setDrawerOpen }: HeaderProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();
  const { width } = useWidth();

  const navigateToFlashcards = () => {
    scrollToExploreFlashcards(navigate);
  };

  return (
    <div className={styles["AuthLayout-header"]}>
      <img
        src={logoImg}
        className={styles["logo"]}
        onClick={() => navigate("/")}
      />

      {showSkip ? (
        <div className={`${styles["AuthLayout-header-buttons"]} w-40`}>
          <Button
            className="yellowButton"
            onClick={() => {
              navigate("/student");
            }}
          >
            {localeButtons.BUTTON_SKIP}
          </Button>
        </div>
      ) : (
        <>
          {width > breakPoints.mlg ? (
            <div className={styles["AuthLayout-header-buttons"]}>
              <Button
                className={styles.button}
                onClick={() => {
                  navigate("/home");
                }}
              >
                {localeButtons.BUTTON_HOME}
              </Button>
              <Button
                className={styles.button}
                // onClick={() => {
                //   navigate("/home");
                // }}
                onClick={navigateToFlashcards}
              >
                {localeButtons.BUTTON_FLASHCARDS}
              </Button>
              <LanguageDropdown />
              <Button
                className="yellowButton"
                onClick={() => {
                  navigate("");
                }}
              >
                {localeButtons.BUTTON_GET_STARTED}
              </Button>
            </div>
          ) : (
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
        </>
      )}
    </div>
  );
};

export default Header;
