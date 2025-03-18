"use client";
import Link  from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

type TransitionLinkProps = {
    children: ReactNode;
} &  React.ComponentProps<typeof Link>;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const TransitionLink: React.FC<TransitionLinkProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(350);
    // await sleep(180);
    await sleep(100)
    router.push(props.href.toString());
    await sleep(80)

    body?.classList.remove("page-transition");
  };

  return (
    <Link {...props} href={props.href.toString()} onClick={handleTransition}>
      {children}
    </Link>
  );
};