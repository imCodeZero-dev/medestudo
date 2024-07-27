import React from "react";
import styles from "./FooterSection.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/Images/Landing/MEDESTUDO.png";
import useLocale from "../../../locales";
import { AiOutlineYoutube } from "react-icons/ai";

const FooterSection = () => {
  const { localeTitles } = useLocale();
  const NavigateToSocial = (link: string) => {
    window.open(link);
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>
            {localeTitles.TITLE_FOR_STUDENTS}
          </h4>
          <ul className={styles.list}>
            <li>{localeTitles.TITLE_FLASHCARDS}</li>
            <li>{localeTitles.TITLE_EXAMS}</li>
            <li>{localeTitles.TITLE_MOCK_EXAMS}</li>
            <li>{localeTitles.TITLE_CUSTOM_FLASHCARDS}</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>
            {" "}
            {localeTitles.TITLE_FOR_PROFESSORS}
          </h4>
          <ul className={styles.list}>
            <li>{localeTitles.TITLE_FLASHCARDS}</li>
            <li>{localeTitles.TITLE_CREATE_EXAMS}</li>
            <li>{localeTitles.TITLE_CREATE_FLASHCARDS}</li>
            <li>{localeTitles.TITLE_DASHBOARD}</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}> {localeTitles.TITLE_CONTACT}</h4>
          <ul className={styles.list}>
            <li>E: info@medestudo.com</li>
            <li>P: +12341241445</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>
            {" "}
            {localeTitles.TITLE_SOCIAL_MEDIA}
          </h4>
          <ul className={styles.listSocials}>
            <div
              className={styles.iconDiv}
              onClick={() =>
                NavigateToSocial("https://www.instagram.com/medestudobr/")
              }
            >
              <FaXTwitter />
            </div>
            <div
              className={styles.iconDiv}
              onClick={() =>
                NavigateToSocial("https://www.instagram.com/medestudobr/")
              }
            >
              <AiOutlineYoutube />
            </div>
            <div
              className={styles.iconDiv}
              onClick={() =>
                NavigateToSocial("https://www.instagram.com/medestudobr/")
              }
            >
              <FaInstagram />
            </div>
            <div
              className={styles.iconDiv}
              onClick={() =>
                NavigateToSocial("https://www.instagram.com/medestudobr/")
              }
            >
              <FaFacebookF />
            </div>
          </ul>
        </div>
      </div>
      <div className={styles.logoSection}>
        <img src={logo} alt="medestudo" className={styles.logo} />
        {/* <h1 className={styles.logo}>MEDESTUDO</h1> */}
      </div>
      <div className={styles.bottom}>
        <Text className={styles.text}>© 2024 Copyright Medestudo</Text>
        <ul className={styles.terms}>
          <li className={styles.text}>Privacy Policy</li>
          <li className={styles.text}>Terms & Conditions</li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterSection;
