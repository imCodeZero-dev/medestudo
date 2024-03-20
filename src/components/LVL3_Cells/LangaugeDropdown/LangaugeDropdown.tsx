import React, { useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import styles from "./LangaugeDropdown.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { setLanguage } from "../../../redux/slices/languageSlice";
import engFlag from "../../../assets/Images/dashboard/eng.png";
import brazilFlag from "../../../assets/Images/dashboard/brazil.png";

const LanguageDropdown = ({}) => {
  const dispatch = useDispatch();

  const currentLang = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const [isOpen, setIsOpen] = useState(false);
  const { localeDropdowns } = useLocale();
  const dropdownRef = useRef<any>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    dispatch(setLanguage(selectedLanguage));
    setIsOpen(false);
  };

  const langs = [
    { code: "en", label: localeDropdowns?.DROPDOWN_ENG, flag: engFlag },
    { code: "es", label: localeDropdowns?.DROPDOWN_ESP, flag: brazilFlag },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["LanguageDropdown"]} ref={dropdownRef}>
      <div className={styles["mainDiv"]} onClick={handleToggle}>
        <div className="flex items-center space-x-1">
          <img
            className="w-6 h-6 rounded-full mr-2 object-cover"
            src={currentLang === "en" ? engFlag : brazilFlag}
            alt={"flag"}
          />
          <Text className={styles["dropdownTxt"]}>
            {currentLang === "en"
              ? localeDropdowns.DROPDOWN_ENG
              : localeDropdowns.DROPDOWN_ESP}
          </Text>
        </div>
        <FaCaretDown />
      </div>

      {isOpen && (
        <div className={`${styles["dropDown"]} ${styles["open"]}`}>
          {langs.map((language) => (
            <div
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className="flex w-full cursor-pointer items-center"
            >
              <img
                className="w-6 h-6 rounded-full mr-2 object-cover"
                src={language.flag}
                alt={language.code}
              />
              <Text className={styles["label"]}>{language.label}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
