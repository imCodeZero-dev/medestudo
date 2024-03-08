import { useState } from "react";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../../../redux/slices/AdminSlice";
import dayjs from "dayjs";
// import { useLocation, useNavigate } from "react-router-dom";

export const useAdminLayout = () => {
  // const navigate = useNavigate();
  const {  } = useLocale();
  const [cookies, setCookie, removeCookie] = useCookies(["admin"]);
  const wipeTokens = () => {
    removeCookie("admin", {
      path: "/",
      expires: new Date(0), // Set expiration to a past date
    });
  };
  const dispatch = useDispatch();
  const [logoutModal, setlogoutModal] = useState<boolean>(false);
  const [logoutLoading, setlogoutLoading] = useState<boolean>(false);
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
    logoutLoading,
    onLogoutConfirm,
  };
};
