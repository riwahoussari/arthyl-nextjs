import Button from "@/components/global/Button";
import { HOME_ABOUT_SECTION_IMG } from "@/utils/images";
import Image from "next/image";
import { HOME_ABOUT_SECTIOIN_TEXT } from "@/utils/text";
import { TransitionLink } from "@/components/global/TransitionLink";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function AboutSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true });
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const isAboutTextInView = useInView(aboutTextRef, { once: true });
  const btnRef = useRef<HTMLDivElement>(null);
  const isBtnInView = useInView(btnRef, { once: true });
  return (
    <section className="side-padding my-50 xl:my-70 mx-auto w-full max-w-[2000px] lg:my-60">
      <div className="relative flex flex-col gap-4">
        {/* title */}
        <h2
          ref={titleRef}
          className="overflow-hidden text-[12vw] font-semibold uppercase leading-[1] lg:text-[min(200px,10vw)]"
        >
          <motion.span
            className="bg-whitebg-clip-texttext-transparentmix-blend-difference inline-block"
            animate={{ y: isTitleInView ? "0" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            meet{" "}
          </motion.span>{" "}
          <motion.span
            className="inline-block bg-white bg-clip-text text-transparent mix-blend-difference"
            animate={{ y: isTitleInView ? "0" : "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.05 }}
          >
            arthyl
          </motion.span>
        </h2>

        {/* img */}
        <div className="aspect-5/6 md:-z-1 w-[min(360px,80%)] self-end overflow-hidden md:absolute md:top-1/2 md:w-[min(700px,42%)] md:-translate-y-1/2">
          <Image
            src={HOME_ABOUT_SECTION_IMG.src}
            alt={HOME_ABOUT_SECTION_IMG.alt}
            placeholder="blur"
            className="-translate-y-1/5 scale-110"
          />
        </div>

        {/* text */}
        <p
          ref={aboutTextRef}
          className="w-[95%] opacity-70 sm:text-lg md:w-[53%] lg:text-2xl lg:leading-[1.4] xl:text-3xl"
        >
          {HOME_ABOUT_SECTIOIN_TEXT.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block whitespace-pre"
                animate={{ y: isAboutTextInView ? 0 : "100%" }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.007,
                  ease: "easeInOut",
                }}
              >
                {word}{" "}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Read More btn */}
        <div
          ref={btnRef}
          className="scale-120 w-fit origin-left overflow-hidden"
        >
          <TransitionLink
            href="/about"
            className="mt-2 w-max overflow-hidden md:mt-8 lg:mt-10 xl:mt-12"
          >
            <motion.div
              animate={{ y: isBtnInView ? 0 : "100%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <Button secondary={true} arrow={true} size="lg">
                Read More
              </Button>
            </motion.div>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
