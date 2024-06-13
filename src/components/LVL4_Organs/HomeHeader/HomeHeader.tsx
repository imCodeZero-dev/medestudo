import styles from "./HomeHeader.module.css";
import { HomeHeaderProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";

const HomeHeader = ({}: HomeHeaderProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();

  return (
    <div className={styles["HomeHeader"]}>
      <img src={logoImg} className={styles["logo"]} />

      <div className={styles["HomeHeader-buttons"]}>
        <Button
          // className={getNavItemClassName(button.label)}
          onClick={() => {
            navigate("");
          }}
        >
          {localeButtons.BUTTON_HOME}
        </Button>
        <Button
          // className={getNavItemClassName(button.label)}
          onClick={() => {
            navigate("");
          }}
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

      <div>
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
    </div>
  );
};

export default HomeHeader;
