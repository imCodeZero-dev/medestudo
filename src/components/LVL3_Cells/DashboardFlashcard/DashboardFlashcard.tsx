import React, { useEffect, useRef, useState } from "react";
import { DashboardFlashcardProps } from "./@types";
import styles from "./DashboardFlashcard.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import dayjs from "dayjs";
import { Menu, MenuItem } from "@mui/material";
import { Flashcard } from "../../../utils/constants/DataTypes";

const DropdownMenu: React.FC<{
  openDeleteModal: ((data: string) => void) | undefined;
  data: Flashcard;
}> = ({ openDeleteModal, data }) => {
  const { localeDropdowns } = useLocale();

  const handleDeleteClick = () => {
    openDeleteModal && openDeleteModal(data?._id);
  };

  return (
    <div className={styles.dropdownMenu}>
      <button onClick={handleDeleteClick}>
        {localeDropdowns.DROPDOWN_DELETE}
      </button>
      {/* Add more dropdown items as needed */}
    </div>
  );
};

const DashboardFlashcard: React.FC<DashboardFlashcardProps> = ({
  data,
  play,
  minView,
  getDetails,
  handleClickOptions,
  anchorEl,
  handleCloseOptions,
  openDeleteModal,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText } = useLocale();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles["DashboardFlashcard"]}>
      <div
        className={styles["DashboardFlashcard-left"]}
        onClick={() => getDetails && getDetails(data?._id)}
      >
        <img className={styles["image"]} src={data?.deckId?.image} />
        <Text className={styles["title"]}>{data?.deckId?.name}</Text>
        {!minView && (
          <Text className={styles["date"]}>
            {" "}
            • {dayjs(data?.updatedAt).format("DD MMM, YYYY")}
          </Text>
        )}
      </div>
      <div className={styles["DashboardFlashcard-right"]} ref={dropdownRef}>
        {/* <BiSolidPencil size={25} color="#2A2D31" className="cursor-pointer" /> */}
        {play ? (
          <IoIosPlayCircle
            size={32}
            color="#FF900E"
            className="cursor-pointer"
          />
        ) : (
          <>
            <IoEllipsisHorizontal
              size={25}
              color="#2A2D31"
              className="cursor-pointer"
              // onClick={handleClickOptions as any}
              onClick={toggleDropdown}
            />
            {/* <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseOptions}
              keepMounted
            >
              <MenuItem
                onClick={() => openDeleteModal && openDeleteModal(data)}
              >
                {localeDropdowns.DROPDOWN_DELETE}
              </MenuItem>
            </Menu> */}
            {isDropdownOpen && (
              <DropdownMenu openDeleteModal={openDeleteModal} data={data} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardFlashcard;
