import { ButtonHTMLAttributes } from "react";
import ArrowSvg from "./ArrowSvg";

export default function Button({
  children, // Text inside the button
  arrow, // Boolean to determine whether to display an arrow icon or not
  size, // Size of the button, either "sm" or "lg"
  secondary = false,
  ...props
}: {
  children: string;
  arrow: boolean;
  size: "sm" | "lg";
  secondary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return !secondary ? (
    <button
      className={
        "group cursor-pointer rounded-full bg-black font-medium text-beige " + // Common styles for the button
        (size == "sm"
          ? " px-3.5 py-1.5 text-sm lg:px-4 lg:py-2 lg:text-base" // Small button styles
          : "px-5 py-2 text-base md:px-6 md:py-2 md:text-lg lg:px-9 lg:py-3 lg:text-xl") + // Large button styles
        (arrow ? " flex gap-3 md:gap-3.5 lg:gap-4" : "") // Add flex and spacing if arrow is present
      }
      {...props}
    >
      {/* Text container with hover animation */}
      <div className="relative overflow-y-hidden">
        {/* Invisible placeholder to maintain height and width */}
        <span className="opacity-0">{children}</span>

        {/* Text moves up & into view on hover */}
        <span className="absolute top-full left-0 duration-200 ease-in-out group-hover:top-0">
          {children}
        </span>

        {/* Text moves up & out of view on hover */}
        <span className="absolute bottom-0 left-0 duration-200 ease-in-out group-hover:bottom-full">
          {children}
        </span>
      </div>

      {/* Render the arrow icon if `arrow` prop is true */}
      {arrow && <ArrowSvg hexColor="#ffffff" className="w-4 md:w-4.5 lg:w-5" />}
    </button>
  ) : (
    <>
      <button
        className={
          "group cursor-pointer rounded-full font-medium text-black " + // Common styles for the button
          (size == "sm"
            ? " text-sm lg:text-base" // Small button styles
            : " text-base md:text-lg lg:text-xl") + // Large button styles
          (arrow ? " flex gap-3 md:gap-3.5 lg:gap-4" : "") // Add flex and spacing if arrow is present
        }
        {...props}
      >
        {/* Text container with hover animation */}
        <div className="relative overflow-y-hidden before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:origin-left before:bg-black before:transition-all before:duration-200 before:content-[''] group-hover:before:scale-x-0">
          {/* Invisible placeholder to maintain height and width */}
          <span className="opacity-0">{children}</span>

          {/* Text moves up & into view on hover */}
          <span className="absolute top-full left-0 duration-200 ease-in-out group-hover:top-0">
            {children}
          </span>

          {/* Text moves up & out of view on hover */}
          <span className="absolute bottom-0 left-0 duration-200 ease-in-out group-hover:bottom-full">
            {children}
          </span>
        </div>

        {/* Render the arrow icon if `arrow` prop is true */}
        {arrow && (
          <ArrowSvg className="w-4 duration-200 ease-in-out group-hover:translate-x-2 md:w-4.5 lg:w-5" />
        )}
      </button>
    </>
  );
}
