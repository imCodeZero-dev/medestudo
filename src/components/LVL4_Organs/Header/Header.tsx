import styles from "./Header.module.css";
import { HeaderProps } from "./types";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";

const Header = ({ showSkip }: HeaderProps) => {
  const { localeButtons } = useLocale();
  const navigate = useNavigate();

  return (
    <div className={styles["AuthLayout-header"]}>
      <img src={logoImg} className={styles["logo"]} />

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
        <div className={styles["AuthLayout-header-buttons"]}>
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
            className="yellowButton"
            // className={getNavItemClassName(button.label)}
            onClick={() => {
              navigate("");
            }}
          >
            {localeButtons.BUTTON_GET_STARTED}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
