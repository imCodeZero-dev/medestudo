import React, { useEffect, useRef } from "react";
import { DashboardExamsProps } from "./@types";
import styles from "./DashboardExams.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { BiSolidPencil } from "react-icons/bi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";

import { IoIosPlayCircle } from "react-icons/io";
import { DropdownMenu } from "../DashboardFlashcard/DashboardFlashcard";
import { useDropdown } from "../../../utils/hooks/helper";

const DashboardExams: React.FC<DashboardExamsProps> = ({
  data,
  play,
  getDetails,
  openDeleteModal,
  openEditModal,
}) => {
  const { localeText } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();
  console.log("isDropdownOpen", isDropdownOpen);

  return (
    <div className={styles["DashboardExams"]}>
      <div
        className={styles["DashboardExams-left"]}
        onClick={() => getDetails && getDetails(data?._id)}
      >
        <div className={styles["icon"]}>
          <MdMenuBook color="#0030DD" size={24} />
        </div>
        <div className={styles["DashboardExams-left-main"]}>
          <Text className={styles["title"]}>{data?.title} • </Text>
          <div className={styles["details"]}>
            <div className={styles["details-section"]}>
              <BsBuildings size={9} color="#545961" />{" "}
              <Text className={styles["detailText"]}> {data?.institute}</Text>
            </div>
            <div className={styles["details-section"]}>
              <FaRegClock size={9} color="#545961" />{" "}
              <Text className={styles["detailText"]}> {data?.time}</Text>
            </div>
            <div className={styles["details-section"]}>
              <FaRegCalendar size={9} color="#545961" />{" "}
              <Text className={styles["detailText"]}> {data?.year}</Text>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["DashboardExams-right"]} ref={dropdownRef}>
        <BiSolidPencil
          size={25}
          color="#2A2D31"
          className="cursor-pointer"
          onClick={() => openEditModal && openEditModal(data)}
        />
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
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <DropdownMenu openDeleteModal={openDeleteModal} data={data} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardExams;
