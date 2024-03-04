import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { IAdmin, IUser } from "../../utils/constants/DataTypes";

interface Props {
  children: ReactNode;
}

export const AdminRoutes = ({ children }: Props) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"] as any);
  console.log("object", cookies.accessToken);

  // useEffect(() => {
  //   if (cookies?.accessToken) {
  //     navigate("/");
  //   }
  // }, [cookies, navigate]);

  // If userData and accessToken are present, render the children
  return !cookies?.accessToken ? <>{children}</> : <LoadingScreen />;
};

AdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
