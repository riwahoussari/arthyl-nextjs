import { AnimatePresence, motion } from "motion/react";
import { PAGES } from "../../utils/contactInfo";
import ArrowSvg from "../global/ArrowSvg";
import { TransitionLink } from "../global/TransitionLink";
import { MouseEventHandler } from "react";

export default function MobileNavMenu({
  isOpen,
  setIsOpen,
  ref,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={ref} // Attach the ref to track clicks outside
          variants={menuSlide}
          initial="initial"
          animate="enter"
          exit="exit"
          className="bg-dark-beige/50 absolute left-0 right-0 top-0 z-0 pb-6 pt-16 uppercase text-black shadow-lg backdrop-blur-xl sm:hidden"
        >
          <nav>
            {PAGES.map((page, i) => (
              <MobileNavLink
                key={page.link} // Use unique key for better React reconciliation
                index={i}
                href={page.link}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {page.name}
              </MobileNavLink>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Motion animation variants for the menu slide-in effect
const menuSlide = {
  initial: { y: "-100%" }, // Start off-screen above
  enter: { y: "0%", transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } },
};

// Component for individual navigation links
function MobileNavLink({
  index,
  onClick,
  ...props
}: { index: number, onClick: MouseEventHandler<HTMLDivElement> } & React.ComponentProps<typeof TransitionLink>) {
  return (
    <motion.div
      custom={PAGES.length - index} // Pass custom value for staggered animation
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={onClick}
      >
      <TransitionLink
      {...props}
        className={`flex w-full justify-between border-b px-2.5 py-6 text-3xl ${index === 0 ? "border-t" : ""}`}
      >
        {props.children}
        <ArrowSvg className="w-6" />
      </TransitionLink>
    </motion.div>
  );
}

// Motion animation variants for individual link animations
const linkSlide = {
  initial: { y: "-200%" }, // Start off-screen above
  enter: (i: number) => ({
    y: "0%", // Animate to normal position
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      delay: 0.1 * i, // Staggered effect for each link
    },
  }),
};
