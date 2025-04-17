export default function XIconSvg() {
  return (
    <svg
      viewBox="0 0 28 22"
      width={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="burger-menu-icon">
        <path
          className="origin-top-left translate-x-2 rotate-45 duration-300 ease-in-out"
          id="top-line"
          opacity={1}
          d="M27 2H1"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          className={
            "origin-bottom-left translate-x-2 -rotate-45 duration-300 ease-in-out"
          }
          id="bottom-line"
          opacity={1}
          d="M27 21H1"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
