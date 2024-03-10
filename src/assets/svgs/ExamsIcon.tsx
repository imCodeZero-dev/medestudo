type Props = {
  color?: string;
  size?: string;
  onClick?: any;
};
function ExamsIcon({  onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      width="87"
      height="87"
      viewBox="0 0 87 87"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1729_12530)">
        <path
          d="M7.25 21.75H21.75V61.625H7.25V21.75ZM25.375 68.875H61.625V14.5H25.375V68.875ZM32.625 21.75H54.375V61.625H32.625V21.75ZM65.25 21.75H79.75V61.625H65.25V21.75Z"
          fill="#E5F0FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_1729_12530">
          <rect width="87" height="87" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default ExamsIcon;

// fill={white ? "#fffff" : "#0F1322"}
