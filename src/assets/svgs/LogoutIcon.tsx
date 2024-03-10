type Props = {
  color?: string;
  size?: string;
  onClick?: any;
};
function LogoutIcon({  size, onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      width={size ? size : "56"}
      height={size ? size : "56"}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0C7" />
      <rect
        x="4"
        y="4"
        width="48"
        height="48"
        rx="24"
        stroke="#FFFAEB"
        stroke-width="8"
      />
      <g clip-path="url(#clip0_1208_21116)">
        <path
          d="M26.09 31.59L27.5 33L32.5 28L27.5 23L26.09 24.41L28.67 27H19V29H28.67L26.09 31.59ZM35 19H21C19.89 19 19 19.9 19 21V25H21V21H35V35H21V31H19V35C19 36.1 19.89 37 21 37H35C36.1 37 37 36.1 37 35V21C37 19.9 36.1 19 35 19Z"
          fill="#FFBC6E"
        />
      </g>
      <defs>
        <clipPath id="clip0_1208_21116">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(16 16)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default LogoutIcon;

// fill={white ? "#fffff" : "#0F1322"}
