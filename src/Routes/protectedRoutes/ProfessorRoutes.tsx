import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";
import { IAdmin, IUser } from "../../utils/constants/DataTypes";

interface Props {
  children: ReactNode;
}

export const ProfessorRoutes = ({ children }: Props) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["professor"] as any);
  console.log("cookies", cookies);

  useEffect(() => {
    if (!cookies?.professor?.token) {
      navigate("/professor/login");
    }
  }, [cookies, navigate]);

  // If userData and accessToken are present, render the children
  return cookies?.professor?.token ? <>{children}</> : <LoadingScreen />;
};

ProfessorRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};
