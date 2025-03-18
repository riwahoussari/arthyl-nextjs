"use client";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_NUMBER,
  PAGES,
  SOCIALS_LINKS,
} from "../../utils/contactInfo";
import ArrowSvg from "../global/ArrowSvg";
import { motion } from "motion/react";
import useMousePosition from "../../utils/useMousePosition";
import { AnchorHTMLAttributes, useRef, useState } from "react";
import { TransitionLink } from "../global/TransitionLink";

/**
 * Footer Component
 * Displays navigation links, contact details, and a custom cursor animation.
 */
export default function Footer() {
  const { x, y } = useMousePosition(); // Track mouse position for the custom cursor.
  const footerRef = useRef<HTMLDivElement>(null); // For custom cursor position calculation
  const [hover, setHover] = useState(false); // State to control hover effects.

  return (
    <>
      <footer
        ref={footerRef}
        className="sticky bottom-0 z-0 flex h-dvh flex-col justify-between overflow-hidden bg-black pb-2 text-white"
      >
        {/* custom cursor */}
        <motion.div
          className="absolute z-0 flex aspect-square w-6 items-center justify-center rounded-full bg-white opacity-0 mix-blend-difference lg:opacity-100"
          animate={{
            top: y - (footerRef.current?.getBoundingClientRect().top || 0) || 0,
            left: x || 0,
            scale: hover ? 3 : 1,
            translate: hover ? "50px 50px" : "30px 30px",
          }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        >
          <ArrowSvg
            className="w-2 duration-200 ease-in-out"
            style={{ scale: hover ? 1 : 0 }}
          />
        </motion.div>

        {/* Big CTA Button */}
        <FooterButton setHover={setHover} />

        {/* Navigation & Contact Links */}
        <div className="flex flex-wrap justify-stretch gap-x-20 gap-y-10 px-4 py-8 md:px-12">
          {/* Navigation Link */}
          <FooterLinksGroup
            setHover={setHover}
            hover={hover}
            title="Menu"
            links={PAGES.map(({ name, link }) => ({
              text: name,
              to: link,
              tag: "Link",
            }))}
          />

          {/* Social Media Links */}
          <FooterLinksGroup
            setHover={setHover}
            hover={hover}
            title="Socials"
            links={SOCIALS_LINKS.map(({ platform, url }) => ({
              text: platform,
              to: url,
              tag: "a",
              target: "_blank",
            }))}
          />

          {/* Phone Number & Email */}
          <FooterLinksGroup
            setHover={setHover}
            hover={hover}
            title="Connect"
            links={[
              {
                text: `+${CONTACT_PHONE_NUMBER}`,
                to: `https://wa.me/${CONTACT_PHONE_NUMBER.replaceAll(" ", "")}`,
                tag: "a",
                target: "_blank",
              },
              {
                text: `${CONTACT_EMAIL}`,
                to: `mailto:${CONTACT_EMAIL}`,
                tag: "a",
                target: "_blank",
              },
            ]}
          />
        </div>

        {/* Copyright & Credits*/}
        <div className="border-t-1 flex w-full items-start justify-between border-white/50 px-4 py-4 text-xs font-light uppercase text-white md:px-12 md:text-sm">
          <p className="opacity-50">
            © 2025 ARTHYL <br />
            ALL RIGHTS RESERVED
          </p>
          <p
            className="hover:not-[underline] cursor-pointer underline opacity-50 hover:opacity-100"
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            <a href="https://instagram.com/riwahoussari34" target="_blank">
              Website By <br />
              Riwa Houssari
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}

/**
 * Footer Call-to-Action Button Component
 * @param setHover - Function to toggle hover state so that the custom cursor animates.
 */
function FooterButton({
  setHover,
}: {
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TransitionLink
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      href="/contact"
      className="border-y-1 group flex w-full translate-y-2 items-stretch justify-between border-white font-semibold uppercase lg:translate-y-0"
    >
      {/* text */}
      <div className="flex w-full items-center justify-start pl-4 text-[min(128px,9vw)] md:pl-12">
        <div className="relative overflow-hidden">
          {/* invisible placeholder */}
          <p className="opacity-0">{"Let's Connect"}</p>
          {/* text that moves up out of view */}
          <p className="z-2 absolute bottom-1/2 translate-y-1/2 duration-200 ease-in-out group-hover:bottom-[100%] group-hover:translate-y-0">
            {"Let's Connect"}
          </p>
          {/* text that moves up into view */}
          <p className="z-2 absolute top-[100%] duration-200 ease-in-out group-hover:top-1/2 group-hover:-translate-y-1/2">
            {"Let's Connect"}
          </p>
        </div>
      </div>

      {/* arrow */}
      <div className="border-l-1 flex aspect-square items-center justify-center border-white px-[5vw] py-8 mix-blend-difference duration-200 ease-in-out group-hover:bg-white">
        <ArrowSvg
          className="w-[min(120px,8vw)] duration-200 ease-in-out group-hover:invert"
          hexColor="#fff"
          strokeWidth={3}
        />
      </div>
    </TransitionLink>
  );
}

/**
 * Footer Links Group Component
 * @param title - Group title.
 * @param links - Array of link objects.
 * @param hover - Hover state for custom cursor and links opacity animations.
 * @param setHover - Function to toggle hover state.
 */
type LinkDetails = {
  text: string;
  to: string;
  tag: "a" | "Link";
  target?: string;
};
function FooterLinksGroup({
  title,
  links,
  setHover,
  hover,
}: {
  title: string;
  links: LinkDetails[];
  hover: boolean;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="grow-1">
      {/* Group Title */}
      <p className="border-b-1 mb-4 border-white/50 pb-2 text-xl font-light text-white/70 lg:text-2xl xl:text-3xl">
        {title}
      </p>

      {/* Links */}
      <div className="flex flex-col text-lg capitalize lg:text-xl xl:text-2xl">
        {links.map(({ text, to, tag, target }) => (
          <div
            key={text}
            className={`my-2.5 w-max ${
              hover && "md:opacity-20"
            } duration-200 ease-in-out hover:opacity-100`}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
          >
            <FooterHoverLink
              tag={tag}
              href={to}
              target={target ? target : "_self"}
            >
              {text}
            </FooterHoverLink>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Footer Hoverable Link Component
 * @param tag - Determines whether it is a Next.js Link or an anchor tag.
 */

type FooterHoverLink =
  | ({ tag: "Link"; children: string } & React.ComponentProps<typeof TransitionLink>)
  | ({ tag: "a"; children: string } & AnchorHTMLAttributes<HTMLAnchorElement>);

export function FooterHoverLink({ tag, children, ...props }: FooterHoverLink) {
  const Component = tag === "Link" ? TransitionLink : "a";
  return (
    <Component
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(props as any)}
      className="group relative flex overflow-hidden"
    >
      {/* Invisible placeholder to maintain height */}
      <span className="opacity-0">{children}</span>

      {/* Text moves up & into view on hover */}
      <span className="absolute top-full bg-white bg-clip-text text-transparent mix-blend-difference duration-200 ease-in-out group-hover:top-0">
        {children}
      </span>

      {/* Text moves up & out of view on hover */}
      <span className="absolute bottom-0 bg-white bg-clip-text text-transparent mix-blend-difference duration-200 ease-in-out group-hover:bottom-full">
        {children}
      </span>
    </Component>
  );
}
