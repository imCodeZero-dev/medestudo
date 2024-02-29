import { useState } from "react";
import styles from "./AdminDashboard.module.css";
import { AdminDashboardProps } from "./types";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";

const AdminDashboard = ({}: AdminDashboardProps) => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");

  return (
    <AdminLayout>
      <div className={styles["AdminDashboard"]}>this is admin</div>
    </AdminLayout>
  );
};

export default AdminDashboard;
