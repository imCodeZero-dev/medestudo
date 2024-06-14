import { useEffect, useState } from "react";
import styles from "./LeftSidebar.module.css";
import { LeftSidebarProps, SidebarOption } from "./types";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openCreateModalClass,
  openCreateModalExam,
} from "../../../redux/actions/modalActions";
// import { openCreateModal } from "../../../redux/actions/modalActions";

const LeftSidebar = ({ options }: LeftSidebarProps) => {
  const [activeTab, setActiveTab] = useState<null | string>(options[0].title);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openCreateModalClass() as any);
  };
  const handleCreateExamModal = () => {
    dispatch(openCreateModalExam() as any);
  };

  const handleTabClick = (opt: { title: string; url: string }) => {
    console.log("handleTabClick", opt);
    if (
      opt?.url === "/professor/classes/new" ||
      opt?.url === "/student/flashcards/new"
    ) {
      handleOpenModal();
    } else if (opt?.url === "/professor/exams/new") {
      handleCreateExamModal();
    } else {
      navigate(opt?.url);
      setActiveTab(opt?.title);
    }
  };

  

  return (
    <div className={styles.LeftSidebar}>
      <img src={logoImg} className={styles.logo} alt="Logo" />

      <div className={styles.navigation}>
        {options.map((option: SidebarOption, index: number) => (
          <div
            key={index}
            className={` ${
              location?.pathname.includes(option?.url)
                ? styles.activeTab
                : styles.tab
            }`}
          >
            <div
              className={
                location?.pathname.includes(option?.url)
                  ? styles.tabSectionActive
                  : styles.tabSection
              }
              onClick={() => handleTabClick(option)}
            >
              {option?.image}
              <span
                className={` ${
                  location?.pathname.includes(option?.url)
                    ? styles.active
                    : styles.inactive
                }`}
              >
                {option.title}
              </span>
            
            </div>
            {(location?.pathname.includes(option?.url) || option.submenu) && (
              <div className={styles.submenu}>
                {option?.submenu?.map(
                  (subItem: SidebarOption, subIndex: number) => (
                    <div
                      className={
                        location?.pathname.includes(subItem?.url)
                          ? styles.tabSectionActive
                          : styles.tabSection
                      }
                      onClick={() => handleTabClick(subItem)}
                    >
                      {subItem?.image}{" "}
                      <span
                        className={` ${
                          location?.pathname.includes(subItem?.url)
                            ? styles.active
                            : styles.inactive
                        }`}
                        key={subIndex}
                      >
                        {subItem.title}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
