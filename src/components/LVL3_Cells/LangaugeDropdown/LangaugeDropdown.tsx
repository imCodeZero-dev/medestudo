import React, { useState } from "react";
import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import { TbWorld } from "react-icons/tb";
// import LanguageIcon from "@mui/icons-material/Language";

interface Language {
  code: string;
  name: string;
}

interface LanguageDropdownProps {
  languages: Language[];
  currentLanguage: Language;
  onLanguageChange: (selectedLanguage: Language) => void;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  languages,
  currentLanguage,
  onLanguageChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (selectedLanguage: Language) => {
    handleClose();
    onLanguageChange(selectedLanguage);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <TbWorld />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
          >
            {language.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageDropdown;
