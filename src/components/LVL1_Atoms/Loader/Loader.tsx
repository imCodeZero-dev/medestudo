import React from "react";
import { LoaderProps } from "./@types";
import Spinner from "./Spinner";
// import LoaderGif from "../../../assets/images/Spin.gif";

const Loader = ({ children = "" }: LoaderProps): JSX.Element => {
  return (
    <span
      className="animate-pulse"
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // marginRight: "4px",
      }}
    >
      <Spinner />
      {children}
    </span>
  );
};

export default Loader;
