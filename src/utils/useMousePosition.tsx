"use client"
import { useEffect, useState } from "react";
import { Coordinates } from "./constants";

export default function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  });

  return mousePosition;
}
