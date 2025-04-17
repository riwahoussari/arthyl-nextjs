"use client";
import { useModal } from "@/context/ModalContext";
import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

export default function LenisScrollWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const { isOpen } = useModal();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (isOpen) {
      lenis.destroy();
    }

    return () => {
      lenis.destroy();
    };
  }, [isOpen]);
  return <>{children}</>;
}
