import { SVGProps } from "react";

export default function ArrowSvg({
  hexColor = "#000000",
  strokeWidth = 2,
  ...props
}: { hexColor?: string, strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 21L21 1M21 1H1M21 1V21"
        stroke={hexColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
