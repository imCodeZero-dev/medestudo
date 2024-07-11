import { useState } from "react";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../../redux/slices/AdminSlice";
// import { useLocation, useNavigate } from "react-router-dom";

export const useAdminLayout = () => {
  // const navigate = useNavigate();
  const {} = useLocale();
  const [cookies, removeCookie] = useCookies(["admin"]);
  const wipeTokens = () => {
    if (!cookies || !cookies.admin) {
      return;
    }
    debugger;
    const cookieOptions = {};
    removeCookie("admin", cookieOptions);
  };
  const dispatch = useDispatch();
  const [logoutModal, setlogoutModal] = useState<boolean>(false);
  // const [logoutLoading, setlogoutLoading] = useState<boolean>(false);
  const handleOpenLogout = () => {
    setlogoutModal(true);
  };
  const handleCloseLogout = () => {
    setlogoutModal(false);
  };

  const onLogoutConfirm = () => {
    wipeTokens();
    dispatch(logoutAdmin());
    handleCloseLogout();
  };

  return {
    logoutModal,
    handleOpenLogout,
    handleCloseLogout,
    // logoutLoading,
    onLogoutConfirm,
  };
};
