import { useState } from "react";
import styles from "./LeftSidebar.module.css";
import { LeftSidebarProps, SidebarOption } from "./types";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const LeftSidebar = ({ options }: LeftSidebarProps) => {
  const [activeTab, setActiveTab] = useState<null | string>(options[0].title);

  const handleTabClick = (title: string) => {
    console.log("handleTabClick");
    setActiveTab(title);
  };
  // const handleTabClickCancel = () => {
  //   console.log("handleTabClickCancel");
  //   setActiveTab("");
  // };

  return (
    <div className={styles.LeftSidebar}>
      <img src={logoImg} className={styles.logo} alt="Logo" />

      <div className={styles.navigation}>
        {options.map((option: SidebarOption, index: number) => (
          <div key={index} className={` ${
            activeTab === option.title ? styles.activeTab : styles.tab
          }`}>
            <div
              className={styles.tabSection}
              onClick={() => handleTabClick(option.title)}
            >
              {option?.image}
              <span
                className={` ${
                  activeTab === option.title ? styles.active : styles.inactive
                }`}
              >
                {option.title}
              </span>
              {/* {option.submenu && (
                <div
                  className={styles.chevron}
                  // onClick={() => toggleSubmenu(option.title)}
                >
                  {activeTab === option.title ? (
                    <FaAngleUp onClick={handleTabClickCancel} />
                  ) : (
                    <FaAngleDown />
                  )}
                </div>
              )} */}
            </div>
            {activeTab === option.title && option.submenu && (
              <div className={styles.submenu}>
                {option.submenu.map(
                  (subItem: SidebarOption, subIndex: number) => (
                    <div className={styles.tabSection}>
                      {subItem?.image}{" "}
                      <span
                        className={` ${
                          activeTab === option.title
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
