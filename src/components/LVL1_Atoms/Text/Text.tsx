import { TextProps } from "./@types";
import styles from "./Text.module.css";

const Text = ({
  children,
  size = "20px",
  color = "black",
  weight,
  className,
  ...props
}: TextProps) => {
  return (
    <div
      className={`${className} ${styles[`text`]} ${styles[`text-${weight}`]} ${
        styles[`text-${color}`]
      } ${styles[`text-${size}`]}`}
      style={props.textStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Text;
