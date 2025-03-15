"use client"
import Link from "next/link";
import arthylSignaturePng from "../../assets/Arthyl-Signature.png";
import Button from "../global/Button";
import { useEffect, useRef, useState } from "react";
import BurgerMenuSvg from "./BurgerMenuSvg";
import MobileNavMenu from "./MobileNavMenu";
import { PAGES } from "../../utils/constants";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import HoverLink from "./HoverLink";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [hideNav, setHideNav] = useState(false);
  const { scrollY } = useScroll();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest > previous && latest > 50) {
      setHideNav(true); // Hide navbar when scrolling down
    } else {
      setHideNav(false); // Show navbar when scrolling up
    }
  });

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const burgerMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !burgerMenuRef.current?.contains(e.target as Node)
      ) {
        setMenuOpen(false); // Close menu if clicked outside
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <motion.header
      className={
        "fixed top-0 z-10 w-full border-b border-[rgba(0,0,0,0.2)] bg-beige/50 text-sm text-black lg:text-base " +
        (menuOpen ? "sm:backdrop-blur-md" : " backdrop-blur-md")
      }
      initial={{ y: "-100%" }}
      animate={{
        y: hasMounted ? (hideNav && !menuOpen ? "-100%" : "0%") : "0%",
      }}
      transition={{
        duration: hasMounted ? 0.3 : 0.7,
        ease: "easeInOut",
        delay: hasMounted ? 0 : 0.3,
      }}
    >
      <div className="side-padding flex w-full items-center justify-between py-2 max-w-[2000px] mx-auto">
        {/* LOGO */}
        <Link href="/">
          <Image
            src={arthylSignaturePng}
            alt="Arthyl"
            className={
              "relative z-1 w-[25vw] max-w-30 lg:max-w-40 " +
              (menuOpen && "max-sm:invertt")
            }
          />
        </Link>

        {/* Pages Navigation Links */}
        <nav className="absolute top-0 bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-4 font-light uppercase sm:flex lg:gap-8">
          {PAGES.map((page, i) => {
            return (
              <HoverLink tag="Link" href={page.link} key={i}>
                {page.name}
              </HoverLink>
            );
          })}
        </nav>

        {/* Shop Page Link (cta) &  burger menu*/}
        <div
          className={
            "relative z-1 flex items-center gap-4 " +
            (menuOpen && " max-sm:invertt")
          }
        >
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            <Button arrow={false} size="sm">
              AQUIRE ARTPIECE
            </Button>
          </Link>

          <div
            ref={burgerMenuRef}
            className="w-7 sm:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <BurgerMenuSvg isOpen={menuOpen} />
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileNavMenu
          ref={mobileMenuRef}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </motion.header>
  );
}
