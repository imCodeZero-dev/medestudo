import { useState } from "react";
import styles from "./AdminDashboard.module.css";
import { AdminDashboardProps } from "./types";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";
import { useCookies } from "react-cookie";

const AdminDashboard = ({}: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const { localeTitles, localeButtons } = useLocale();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);

  console.log("cookies", cookies);

  return (
    <AdminLayout>
      <div className={styles["AdminDashboard"]}>
        <div className={styles["AdminDashboard-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.WELCOME_BACK_ADMIN}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            <Button leftIcon={<IoMdAdd />} className="secondaryBtn">
              {localeButtons?.BUTTON_CREATE_TAG}
            </Button>
            <Button leftIcon={<IoMdAdd />} className="purpleBtn">
              {localeButtons?.BUTTON_CREATE_DECK}
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
