import { useState } from "react";

import useLocale from "../../../../locales";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { logoutProfessor } from "../../../../redux/slices/ProfessorSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useLocation, useNavigate } from "react-router-dom";

export const useHomeLayout = () => {
  // const navigate = useNavigate();
  const {} = useLocale();
  const [cookies, removeCookie] = useCookies(["professor"]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: {
      search: "",
    },
  });
  const wipeTokens = () => {
    if (!cookies || !cookies.professor) {
      return;
    }
    removeCookie("professor", {
      path: "/",
      expires: new Date(0),
    });
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
    dispatch(logoutProfessor());
    handleCloseLogout();
  };

  return {
    logoutModal,
    handleOpenLogout,
    handleCloseLogout,
    // logoutLoading,
    onLogoutConfirm,
    control,
    handleSubmit,
  };
};
