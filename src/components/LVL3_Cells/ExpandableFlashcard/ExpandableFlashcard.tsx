import React, { useEffect, useRef, useState } from "react";
import { ExpandableFlashcardProps } from "./@types";
import styles from "./ExpandableFlashcard.module.css";
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
import Checkbox from "../../LVL1_Atoms/CheckBox";
import { Controller } from "react-hook-form";
import { TbCards } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { handleImageURL } from "../../../utils/constants/constants";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { useWidth } from "../../../utils/hooks/responsiveHook";

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

const ExpandableFlashcard: React.FC<ExpandableFlashcardProps> = ({
  data,
  play,
  minView,
  getDetails,
  openDeleteModal,
  control,
  onCheckboxChange,
  handleCheckboxDecks,
  selectedDecks,
  custom,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { width } = useWidth();
  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeLables } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  const subDecks = data?.decks || [];
  // console.log("subDecks", subDecks);
  // console.log("selectedData", data);
  // console.log("selectedDecks", selectedDecks);

  return (
    <motion.div
      className={`${styles.ExpandableFlashcard} ${
        isHovered ? styles.ExpandableFlashcardExpanded : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${styles.ExpandableFlashcardMain} `}>
        <Controller
          name={`class-${data._id}`}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <input
                type="checkbox"
                checked={
                  subDecks?.length > 0 &&
                  subDecks?.every((subDeck: any) =>
                    selectedDecks?.some(
                      (selectedDeck: any) => selectedDeck._id === subDeck?._id
                    )
                  )
                }
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  onChange(isChecked);
                  onCheckboxChange && onCheckboxChange(isChecked, data?.decks);
                }}
                className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
              />
            </>
          )}
        />
        <div
          className={styles["ExpandableFlashcard-left"]}
          onClick={() => getDetails && getDetails(data)}
        >
          <img
            className={styles["image"]}
            src={handleImageURL(data?.deckId?.image)}
          />

          {!minView && (
            <div>
              <Text className={`${styles["title"]} line-clamp-1`}>
                {custom ? data?.title : data?.deckId?.name}
              </Text>
              {!custom && (
                <Text className={`${styles["certifiedText"]} `}>
                  <FaCheckCircle fill="#1DB954" />
                  <span className="line-clamp-1">
                    {localeLables.LABEL_MEDESTUDIO_CERTIFIED}
                  </span>
                </Text>
              )}
            </div>
          )}
        </div>
        <div className={styles["ExpandableFlashcard-right"]} ref={dropdownRef}>
          <Text className={styles["cardNumber"]}>{data?.flashcardCount}</Text>
          <TbCards size={width > breakPoints?.sm ? 26 : 16} fill="black" />
          {custom && (
            <>
              <BiSolidPencil
                size={25}
                color="#2A2D31"
                className="cursor-pointer"
              />
              <IoEllipsisHorizontal
                size={25}
                color="#2A2D31"
                className="cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <DropdownMenu openDeleteModal={openDeleteModal} data={data} />
              )}
            </>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles["expandedContent"]}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* {data?.subDeck?.subDeck?.map((dcks: any, i: any) => ( */}
            {data?.decks?.map((dcks: any, i: any) => (
              <div className={`${styles["expandedContent-main"]} `}>
                <Controller
                  name={`decks-${data._id}`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <input
                        type="checkbox"
                        // id={data?.deckId?._id}
                        checked={
                          // selectedDecks?.length > 0 &&
                          selectedDecks?.find((d: any) => d?._id === dcks?._id)
                        }
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          onChange(isChecked);
                          handleCheckboxDecks &&
                            handleCheckboxDecks(isChecked, dcks);
                        }}
                        className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
                      />
                    </>
                  )}
                />
                <div
                  className={styles["expandedContent-left"]}
                  onClick={() => getDetails && getDetails(data)}
                >
                  <div>
                    <Text className={`${styles["title"]} line-clamp-1`}>
                      {dcks?.subdeck?.name}
                    </Text>
                  </div>
                </div>
                <div className={styles["expandedContent-right"]}>
                  {/* <BiSolidPencil size={25} color="#2A2D31" className="cursor-pointer" /> */}

                  <Text className={styles["cardNumber"]}>
                    {dcks?.cardCount}
                  </Text>
                  <TbCards
                    size={width > breakPoints?.sm ? 26 : 16}
                    fill="black"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandableFlashcard;
