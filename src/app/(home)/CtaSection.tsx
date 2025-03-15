import Button from "@/components/global/Button";
import { useMotionValueEvent, useScroll, useTransform, motion } from "framer-motion";
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
    useMotionValueEvent(scrollYProgress, "change", () => {
      if (scrollYProgress.get() >= 0.9) {
        setBgColor("#000000");
      } else {
        setBgColor("#f5f0ed");
      }
    });
  
    const { scrollYProgress: leaveYProgress } = useScroll({
      target: sectionRef,
      offset: ["end end", "end start"],
    });
    const scaleX = useTransform(leaveYProgress, [0, 1], [1, 0.95]);
  
    return (
      <motion.section
        className="side-padding lg:rounded-b-5xl xl:rounded-b-6xl flex min-h-dvh items-end rounded-b-3xl md:rounded-b-4xl"
        animate={{ background: bgColor }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ scaleX }}
        ref={sectionRef}
      >
        <div className="mx-auto mb-14 flex w-[min(558px,100%)] flex-col items-start space-y-14 md:w-[666px] md:space-y-20 md:pb-10 lg:w-[845px] lg:pb-20 xl:w-[1000px] xl:space-y-24 xl:pb-30 2xl:w-[1150px]">
          <h2 className="bg-white bg-clip-text text-[min(72px,14vw)] leading-[1] font-semibold text-transparent capitalize mix-blend-difference md:text-[86px] lg:text-[100px] xl:text-[128px] 2xl:text-[145px]">
            For The <br /> Ambitious & Bold
          </h2>
          <div className="flex w-full flex-col items-start gap-8 xl:flex-row-reverse xl:items-end xl:justify-between">
            <p className="max-w-[620px] bg-white bg-clip-text text-lg text-transparent opacity-80 mix-blend-difference md:text-[22px] xl:text-2xl">
              Want a bespoke plexiglass masterpiece? <br />
              Whether it’s a personal project or a statement piece for your space,
              collaborate with Arthyl to create something truly one-of-a-kind.
            </p>
            <motion.div
              animate={{
                filter: bgColor === "#000000" ? "invert(100%)" : "none",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Button arrow size="lg">
                Artify Your Space
              </Button>
            </motion.div>
          </div>
          {/* <div className="h-[1px] w-full bg-white opacity-0 mix-blend-difference lg:h-[2px]"></div> */}
        </div>
      </motion.section>
    );
  }