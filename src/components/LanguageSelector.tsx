import React from 'react';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../redux/slices/languageSlice';
import useLocale from '../locales';


const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const {localeButtons} = useLocale()

  const changeLanguage = (language: string) => {
    dispatch(setLanguage(language));
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>{localeButtons.CURRENT_LANG}</button>
      <button onClick={() => changeLanguage('es')}>{localeButtons.CURRENT_LANG}</button>
    </div>
  );
};

export default LanguageSelector;
