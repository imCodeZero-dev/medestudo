import React, { useEffect, useRef, useState } from "react";
import { QuestionBarProps } from "./@types";
import styles from "./QuestionBar.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoIosPlayCircle } from "react-icons/io";
import { useDropdown } from "../../../utils/hooks/helper";
import { FiTrash } from "react-icons/fi";

const QuestionBar: React.FC<QuestionBarProps> = ({
  data,
  play,
  getDetails,
  openDeleteModal,
  openEditModal,
  index,
}) => {
  const { localeText } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  // Create a temporary element to parse the HTML
  const decodedQuestion = data?.question ? atob(data.question) : "";

  const tempElement = document.createElement("div");
  tempElement.innerHTML = decodedQuestion;

  // Get all <p> elements within the temporary element
  const paragraphs = tempElement.querySelectorAll("p, h1, h2, h3,h4,h5,h6");

  // Extract text content from each <p> element
  const textContents = Array.from(paragraphs).map((p) => p.textContent);

  

  return (
    <div className={styles["QuestionBar"]}>
      <div
        className={styles["QuestionBar-left"]}
        onClick={() => getDetails && getDetails(data?._id, index)}
      >
        <div className={styles["icon"]}>{`Q${index + 1}`}</div>
        <div className={styles["QuestionBar-left-main"]}>
          <Text className={styles["title"]}>{textContents[0]} • </Text>
        </div>
      </div>
      <div className={styles["QuestionBar-right"]} ref={dropdownRef}>
        <BiSolidPencil
          size={16}
          color="#3359E4"
          className="cursor-pointer"
          onClick={() => openEditModal && openEditModal(data)}
        />
        {play ? (
          <IoIosPlayCircle
            size={16}
            color="#FF900E"
            className="cursor-pointer"
          />
        ) : (
          <>
            <FiTrash
              size={16}
              color="#CC5200"
              className="cursor-pointer"
              onClick={() => openDeleteModal && openDeleteModal(data?._id)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionBar;
