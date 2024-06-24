import React from "react";
import styles from "./FooterSection.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../../../assets/Images/Landing/MEDESTUDO.png";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>For Students</h4>
          <ul className={styles.list}>
            <li>Flashcards</li>
            <li>Exams</li>
            <li>Mock Exams</li>
            <li>Custom Flashcards</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>For Professors</h4>
          <ul className={styles.list}>
            <li>Flashcards</li>
            <li>Create Exams</li>
            <li>Create Flashcards</li>
            <li>Dashboard</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Contact</h4>
          <ul className={styles.list}>
            <li>E: info@medestudo.com</li>
            <li>P: +12341241445</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Social Media</h4>
          <ul className={styles.listSocials}>
            <div className={styles.iconDiv}>
              <FaXTwitter />
            </div>
            <div className={styles.iconDiv}>
              <FaLinkedinIn />
            </div>
            <div className={styles.iconDiv}>
              <FaInstagram />
            </div>
            <div className={styles.iconDiv}>
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
