import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../pages/LoadingScreen/LoadingScreen";
import PropTypes from "prop-types";
import { useCookies } from "react-cookie";

interface Props {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"] as any);
  const navigate = useNavigate();
  console.log("cookies", cookies);

  useEffect(() => {
    if (!cookies?.accessToken) {
      navigate("/login");
    } else {
      if (cookies?.userData?.formFilled === false) {
        navigate("/questionnaire");
      }
    }
  }, [cookies, navigate]);

  // If userData and accessToken are present, render the children
  return cookies?.accessToken ? <>{children}</> : <LoadingScreen />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
