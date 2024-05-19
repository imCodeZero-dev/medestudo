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
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // const { localeText, localeDropdowns } = useLocale();
  const { localeText, localeLables } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

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
          name={"abc"}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <input
                type="checkbox"
                // id={data?.deckId?._id}
                onChange={(e) => {
                  // if (e.target.checked) {
                  //   setSelectedCheckboxes &&
                  //     setSelectedCheckboxes((prev) => [...prev, name]);
                  // } else {
                  //   setSelectedCheckboxes &&
                  //     setSelectedCheckboxes((prev) =>
                  //       prev.filter((item) => item !== name)
                  //     );
                  // }
                  onChange(e.target.checked);
                }}
                className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
              />
            </>
          )}
        />
        <div
          className={styles["ExpandableFlashcard-left"]}
          onClick={() => getDetails && getDetails(data?._id)}
        >
          <img className={styles["image"]} src={data?.deckId?.image} />

          {!minView && (
            <div>
              <Text className={styles["title"]}>{data?.deckId?.name}</Text>
              <Text className={styles["certifiedText"]}>
                <FaCheckCircle fill="#1DB954" />
                {localeLables.LABEL_MEDESTUDIO_CERTIFIED}
              </Text>
            </div>
          )}
        </div>
        <div className={styles["ExpandableFlashcard-right"]} ref={dropdownRef}>
          {/* <BiSolidPencil size={25} color="#2A2D31" className="cursor-pointer" /> */}

          <Text className={styles["cardNumber"]}>55</Text>
          <TbCards size={26} fill="black" />
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
            {data?.decks?.map((dcks: any, i: any) => (
              <div className={`${styles["expandedContent-main"]} `}>
                <Controller
                  name={"abc"}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <input
                        type="checkbox"
                        // id={data?.deckId?._id}
                        onChange={(e) => {
                          onChange(e.target.checked);
                        }}
                        className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
                      />
                    </>
                  )}
                />
                <div
                  className={styles["expandedContent-left"]}
                  onClick={() => getDetails && getDetails(data?._id)}
                >
                  <div>
                    <Text className={styles["title"]}>{dcks?.name}</Text>
                  </div>
                </div>
                <div className={styles["expandedContent-right"]}>
                  {/* <BiSolidPencil size={25} color="#2A2D31" className="cursor-pointer" /> */}

                  <Text className={styles["cardNumber"]}>55</Text>
                  <TbCards size={26} fill="black" />
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
