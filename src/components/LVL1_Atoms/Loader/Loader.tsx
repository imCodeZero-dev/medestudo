import { LoaderProps } from "./@types";
import Spinner from "./Spinner";

const Loader = ({ children = "" }: LoaderProps): JSX.Element => {
  return (
    <span
      className="animate-pulse"
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
      {children}
    </span>
  );
};

export default Loader;
