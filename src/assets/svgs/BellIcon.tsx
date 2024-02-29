type Props = {
  color?: string;
  size?: string;
  onClick?: any;
};
function BellIcon({ color, size, onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4417 17.5003C11.2952 17.7529 11.0849 17.9625 10.8319 18.1083C10.5788 18.254 10.292 18.3307 10 18.3307C9.70802 18.3307 9.42116 18.254 9.16814 18.1083C8.91513 17.9625 8.70484 17.7529 8.55833 17.5003M15 6.66699C15 5.34091 14.4732 4.06914 13.5355 3.13146C12.5979 2.19378 11.3261 1.66699 10 1.66699C8.67392 1.66699 7.40215 2.19378 6.46447 3.13146C5.52678 4.06914 5 5.34091 5 6.66699C5 12.5003 2.5 14.167 2.5 14.167H17.5C17.5 14.167 15 12.5003 15 6.66699Z"
        stroke={color ? color : "#667085"}
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default BellIcon;

// fill={white ? "#fffff" : "#0F1322"}
