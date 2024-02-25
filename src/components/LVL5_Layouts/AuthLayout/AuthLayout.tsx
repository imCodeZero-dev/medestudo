import styles from "./MyJobsPage.module.scss";
import { useNavigate } from "react-router-dom";
import { AuthLayoutProps } from "./types";
import AuthImageSlider from "../../LVL4_Organs/AuthImageSlider/AuthImageSlider";
import img1 from "../../../assets/Images/Auth/authHero1.jpg";
import img2 from "../../../assets/Images/Auth/authHero2.jpg";
import img3 from "../../../assets/Images/Auth/authHero3.jpg";

const dummyData = [
  {
    image: img1,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit.",
  },
  {
    image: img2,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit.",
  },
  {
    image: img3,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit.",
  },
];

const AuthLayout = ({}: AuthLayoutProps) => {
  //   const navigate = useNavigate();

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* <div style={{ flex: 1 }}><FormComponent /> </div> */}
      <div>
        <AuthImageSlider items={dummyData} />
      </div>
    </div>
  );
};

export default AuthLayout;
