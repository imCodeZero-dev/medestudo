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
import { TiDeleteOutline } from "react-icons/ti";
import { useDropdown } from "../../../utils/hooks/helper";
import { examCardData } from "../DashboardExams/@types";
import { handleImageURL } from "../../../utils/constants/constants";

export const DropdownMenu: React.FC<{
  openDeleteModal: ((data: string) => void) | undefined;
  data: Flashcard | examCardData;
}> = ({ openDeleteModal, data }) => {
  const { localeDropdowns } = useLocale();

  const handleDeleteClick = () => {
    openDeleteModal && openDeleteModal(data?._id);
  };

  return (
    <div className={styles.dropdownMenu}>
      <div
        onClick={handleDeleteClick}
        className="flex p-3 space-x-2 items-center cursor-pointer"
      >
        <TiDeleteOutline color="red" />{" "}
        <Text>{localeDropdowns.DROPDOWN_DELETE}</Text>
      </div>
      {/* Add more dropdown items as needed */}
    </div>
  );
};

const DashboardFlashcard: React.FC<DashboardFlashcardProps> = ({
  data,
  play,
  minView,
  getDetails,
  openDeleteModal,
  getDetailsCustom,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  return (
    <div className={styles["DashboardFlashcard"]}>
      <div
        className={styles["DashboardFlashcard-left"]}
        onClick={() =>
          getDetails
            ? getDetails(data?._id)
            : getDetailsCustom && getDetailsCustom(data)
        }
      >
        <img
          className={styles["image"]}
          src={handleImageURL(data?.deckId?.image)}
        />
        {data?.title ? (
          <Text className={styles["title"]}>{data?.title}</Text>
        ) : (
          <Text className={styles["title"]}>{data?.deckId?.name}</Text>
        )}

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
