import Button from "@/components/global/Button";
import { TransitionLink } from "@/components/global/TransitionLink";
import { HOME_CTA_SECTION_TEXT, HOME_CTA_SECTION_TITLE } from "@/utils/text";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import { useRef } from "react";

export default function CtaSection({
  bgColor,
  setBgColor,
}: {
  bgColor: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // text reveal animation once in view
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true });

  // change bg color on scroll
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (scrollYProgress.get() >= 0.9) {
      setBgColor("#000000");
    } else {
      setBgColor("#f5f0ed");
    }
  });

  // scale down while scrolling out of view
  const { scrollYProgress: leaveYProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });
  const scaleX = useTransform(leaveYProgress, [0, 1], [1, 0.95]);

  return (
    <motion.section
      className="side-padding lg:rounded-b-5xl xl:rounded-b-6xl md:rounded-b-4xl flex min-h-dvh items-end rounded-b-3xl"
      animate={{ background: bgColor }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ scaleX }}
      ref={sectionRef}
    >
      <div className="xl:pb-30 mx-auto mb-14 flex w-[min(600px,100%)] flex-col items-start space-y-14 md:w-[710px] md:space-y-20 md:pb-10 lg:w-[845px] lg:pb-20 xl:w-[1050px] xl:space-y-24 2xl:w-[1190px]">
        {/* title */}
        <h2
          ref={titleRef}
          className="text-[min(72px,14vw)] font-semibold capitalize leading-[1] md:text-[86px] lg:text-[100px] xl:text-[128px] 2xl:text-[145px]"
        >
          {/* For The <br /> Ambitious & Bold */}
          {HOME_CTA_SECTION_TITLE.split(" ").map((word, i) => {
            let brCount = 0;
            if (word == "<br>") {
              brCount++;
              return <br key={i} />;
            }
            return (
              <span key={i} className="inline-block overflow-hidden">
                <motion.span
                  animate={{ y: isTitleInView ? 0 : "100%" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: 0.1 * i - brCount,
                  }}
                  className="inline-block whitespace-pre bg-white bg-clip-text text-transparent mix-blend-difference"
                >
                  {word}{" "}
                </motion.span>
              </span>
            );
          })}
        </h2>

        {/* text and button */}
        <div className="flex w-full flex-col items-start gap-8 xl:flex-row-reverse xl:items-end xl:justify-between">
          <p
            ref={textRef}
            className="max-w-[620px] text-lg  md:text-[22px] xl:text-2xl"
          >
            {HOME_CTA_SECTION_TEXT.split(" ").map((word, i) => {
              if (word === "<br>") {
                return <br key={i} />;
              }
              return (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block whitespace-pre bg-white bg-clip-text text-transparent mix-blend-difference opacity-80"
                    animate={{ y: isTextInView ? 0 : "100%" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.01,
                      ease: "easeInOut",
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              );
            })}
          </p>
          <motion.div
            animate={{
              filter: bgColor === "#000000" ? "invert(100%)" : "none",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <TransitionLink href="/shop">
              <Button arrow size="lg">
                Artify Your Space
              </Button>
            </TransitionLink>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
