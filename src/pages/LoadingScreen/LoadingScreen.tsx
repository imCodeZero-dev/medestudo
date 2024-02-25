import Loader from "../../components/LVL1_Atoms/Loader";
import styles from "./LoadingScreen.module.css";
// import { Loader } from "../../components";

const LoadingScreen = () => {
  // const { localeTitles, localeBasics } = useLocale();

  return (
    <>
      <div className={styles["LoadingScreen"]}>
        <div className={styles["loading-icon"]}></div>
        <Loader />
      </div>
    </>
  );
};

export default LoadingScreen;
