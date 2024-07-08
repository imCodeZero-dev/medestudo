import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { IAdmin, IUser } from "../../utils/constants/DataTypes";

interface Props {
  children: ReactNode;
}

export const StudentRoutes = ({ children }: Props) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["student"] as any);
  console.log("cookies", cookies);

  useEffect(() => {
    if (!cookies?.student?.token) {
      navigate("/");
    }
  }, [cookies, navigate]);

  // If userData and accessToken are present, render the children
  return cookies?.student?.token ? <>{children}</> : <LoadingScreen />;
};

StudentRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
