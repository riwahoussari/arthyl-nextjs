import { AnimatePresence, motion } from "motion/react";
import { EASE_IN_OUT_CUBIC, PAGES } from "../../utils/constants"
import ArrowSvg from "../global/ArrowSvg";
import Link from "next/link";

export default function MobileNavMenu({
  menuOpen,
  setMenuOpen,
  ref
}: {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <>
      <AnimatePresence mode="wait">
        {menuOpen && (
          <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute top-0 right-0 left-0 z-0 bg-dark-beige/50 pt-16 pb-6 text-black uppercase shadow-lg backdrop-blur-xl sm:hidden"
            ref={ref}
          >
            <nav>
              {PAGES.map((page, i) => {
                return (
                  <MobileNavLink
                    index={i}
                    key={i}
                    onClick={() => setMenuOpen(false)}
                    href={page.link}
                  >
                    {page.name}
                  </MobileNavLink>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const menuSlide = {
  initial: {
    y: "-100%",
  },
  enter: {
    y: "0%",
    transition: { duration: 0.5, ease: EASE_IN_OUT_CUBIC },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.5, ease: EASE_IN_OUT_CUBIC },
  },
};

function MobileNavLink({
  index,
  ...props
}: { index: number } & React.ComponentProps<typeof Link>) {
  return (
    <motion.div
      custom={PAGES.length - index}
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <Link
        {...props}
        className={
          "flex w-full justify-between border-b px-2.5 py-6 text-3xl " +
          (index === 0 && " border-t")
        }
      >
        {props.children}
        <ArrowSvg className="w-6" />
      </Link>
    </motion.div>
  );
}

const linkSlide = {
  initial: {
    y: "-200%",
  },
  enter: (i: number) => ({
    y: "0%",
    transition: {
      duration: 0.5,
      ease: EASE_IN_OUT_CUBIC,
      delay: 0.1 * i,
    },
  }),
};
