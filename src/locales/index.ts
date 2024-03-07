// src/hooks/useLocale.ts
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BUTTONS } from "./BUTTONS";
import { TITLES } from "./TITLES";
import { TEXT } from "./TEXT";
import { PLACEHOLDERS } from "./PLACEHOLDERS";
import { LABELS } from "./LABELS";
import { DROPDOWNS } from "./DROPDOWNS";
import { SUCCESS } from "./SUCCESS";
import { ERRORS } from "./ERRORS";

type Language = "en" | "es";

const useLocale = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.currentLanguage
  );

  const localeButtons = BUTTONS[currentLanguage as Language];
  const localeTitles = TITLES[currentLanguage as Language];
  const localeText = TEXT[currentLanguage as Language];
  const localePlaceholders = PLACEHOLDERS[currentLanguage as Language];
  const localeLables = LABELS[currentLanguage as Language];
  const localeDropdowns = DROPDOWNS[currentLanguage as Language];
  const localeSuccess = SUCCESS[currentLanguage as Language];
  const localeErrors = ERRORS[currentLanguage as Language];

  return {
    localeButtons,
    localeTitles,
    localeText,
    localePlaceholders,
    localeLables,
    localeDropdowns,
    localeSuccess,
    localeErrors,
  };
};

export default useLocale;
