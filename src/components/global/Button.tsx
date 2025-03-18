import { ButtonHTMLAttributes } from "react";
import ArrowSvg from "./ArrowSvg";

type ButtonProps = {
  children: string; // Text inside the button
  arrow: boolean; // Boolean to determine whether to display an arrow icon or not
  size: "sm" | "lg"; // Size of the button, either "sm" or "lg"
  secondary?: boolean; // primary or secondary to determine the style
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  arrow,
  size,
  secondary = false,
  ...props
}: ButtonProps) {
  // Base styles for primary and secondary buttons
  const baseStyles =
    " group cursor-pointer rounded-full font-medium " +
    (secondary ? " text-black " : " bg-black text-beige ");

  // Size-based styles
  const sizeStyles =
    size === "sm"
      ? " text-sm lg:text-base " +
        (!secondary && " px-3.5 py-1.5 lg:px-4 lg:py-2 ")
      : " text-base md:text-lg lg:text-xl " +
        (!secondary && "px-5 py-2 md:px-6 md:py-2 lg:px-9 lg:py-3");

  // Add spacing when arrow is present
  const arrowSpacing = "" + (arrow && " flex gap-3 md:gap-3.5 lg:gap-4 ");

  // Underline effect for secondary buttons
  const containerUnderlineEffect =
    " relative overflow-y-hidden " +
    (secondary &&
      " before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:bg-black before:transition-all before:duration-200 before:content-[''] group-hover:before:scale-x-0 ");

  // Arrow sizing
  const arrowStyles =
    " md:w-4.5 w-4 lg:w-5 " +
    (secondary && " duration-200 ease-in-out group-hover:translate-x-2 ");

  const arrowColor = secondary ? "#000000" : "#ffffff";

  return (
    <button className={baseStyles + sizeStyles + arrowSpacing} {...props}>
      {/* Text container with hover animation */}
      <div className={containerUnderlineEffect}>
        {/* Invisible placeholder to maintain height and width */}
        <span className="opacity-0">{children}</span>

        {/* Text moves up & into view on hover */}
        <span className="absolute left-0 top-full duration-200 ease-in-out group-hover:top-0">
          {children}
        </span>

        {/* Text moves up & out of view on hover */}
        <span className="absolute bottom-0 left-0 duration-200 ease-in-out group-hover:bottom-full">
          {children}
        </span>
      </div>

      {/* Render the arrow icon if `arrow` prop is true */}
      {arrow && <ArrowSvg hexColor={arrowColor} className={arrowStyles} />}
    </button>
  );
}
