type Props = {
  color?: string;
  size?: string;
  onClick?: any;
};
function AddDeckIcon({ color, size, onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      width={size ? size : "18"}
      height={size ? size : "18"}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.33341 4.00033H0.666748V15.667C0.666748 16.5837 1.41675 17.3337 2.33341 17.3337H14.0001V15.667H2.33341V4.00033ZM15.6667 0.666992H5.66675C4.75008 0.666992 4.00008 1.41699 4.00008 2.33366V12.3337C4.00008 13.2503 4.75008 14.0003 5.66675 14.0003H15.6667C16.5834 14.0003 17.3334 13.2503 17.3334 12.3337V2.33366C17.3334 1.41699 16.5834 0.666992 15.6667 0.666992ZM15.6667 12.3337H5.66675V2.33366H15.6667V12.3337ZM9.83341 11.5003H11.5001V8.16699H14.8334V6.50033H11.5001V3.16699H9.83341V6.50033H6.50008V8.16699H9.83341V11.5003Z"
        fill="#1D1F22"
      />
    </svg>
  );
}

export default AddDeckIcon;

// fill={white ? "#fffff" : "#0F1322"}
