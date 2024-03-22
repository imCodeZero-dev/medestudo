import { AuthLayoutProps } from "./types";
import styles from "./AuthLayout.module.css";
import AuthImageSlider from "../../LVL4_Organs/AuthImageSlider/AuthImageSlider";
import img1 from "../../../assets/Images/Auth/authHero1.jpg";
import img2 from "../../../assets/Images/Auth/authHero2.jpg";
import img3 from "../../../assets/Images/Auth/authHero3.jpg";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { Button } from "../../LVL1_Atoms/Button";
import { useNavigate } from "react-router-dom";
import useLocale from "../../../locales";
import HeaderMenuDropdown from "../../LVL3_Cells/HeaderMenuDropdown/HeaderMenuDropdown";

const dummyData = [
  {
    image: img2,
    text: "First Text.",
  },
  {
    image: img3,
    text: "Second Text",
  },
  {
    image: img1,
    text: "Third Text",
  },
];

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { width } = useWidth();
  const navigate = useNavigate();
  const { localeButtons, localeTitles } = useLocale();

  //   const navigate = useNavigate();

  return (
    <div>
      <div className={styles["AuthLayout-header"]}>
        <img src={logoImg} className={styles["logo"]} />

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
      </div>
      <div className={styles["AuthLayout-body"]}>
        <div className={styles["leftSection"]}>{children}</div>
        {/* <div style={{ flex: 1 }}><FormComponent /> </div> */}
        <div className={styles["rightSection"]}>
          <AuthImageSlider items={dummyData} />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
