"use client";
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import PageTitle from "../../components/global/PageTitle";
import { Fragment, HTMLAttributes, useEffect, useRef, useState } from "react";
import Frame4by5 from "./Frame4by5Svg";
import Image from "next/image";
import { ABOUT_ME_PARAGRAPHS } from "../../utils/text";
import { ABOUT_PAGE_IMG } from "@/utils/images";

export default function AboutPage() {
  const textContainer = useRef(null);
  const { scrollYProgress: textYProgress } = useScroll({
    target: textContainer,
    offset: ["start end", "end end"],
  });

  // paragraph title parallax
  const titleParallaxes: MotionValue<number>[] = [];
  // small screens progress lines
  const linesProgress: MotionValue<number>[] = [];

  for (let i = 0; i < ABOUT_ME_PARAGRAPHS.length; i++) {
    const percentage = 1 / ABOUT_ME_PARAGRAPHS.length;
    const start = i * percentage;
    const end = start + percentage;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    titleParallaxes.push(useTransform(textYProgress, [start, end], [17, -25]));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    linesProgress.push(useTransform(textYProgress, [start, end], [0, 1]));
  }

  return (
    <>
      <PageTitle>ABOUT ME</PageTitle>
      <section className="xl:gap-26 lg:flex lg:items-start lg:justify-center lg:gap-[6vw] 2xl:gap-40">
        {/* ARTHYL Image */}
        <div className="mx-auto w-[94vw] max-w-[500px] lg:sticky lg:top-0 lg:mx-0 lg:h-dvh lg:w-[min(380px,max(60vh,350px))] lg:pt-[calc(_(100vh-475px)/2_+30px)] xl:w-[400px] xl:pt-[calc(_(100vh-500px)/2_+24px)]">
          <div className="relative">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            >
              <Image
                className={`aspect-4/5 w-full object-cover object-bottom`}
                src={ABOUT_PAGE_IMG.src}
                alt={ABOUT_PAGE_IMG.alt}
                placeholder="blur"
              />
            </motion.div>
            {/* animated progress rectangle around image */}
            <Frame4by5
              progress={textYProgress}
              className="absolute -left-6 -right-6 top-1/2 hidden -translate-y-1/2 lg:-left-4 lg:-right-4 lg:block xl:-left-5 xl:-right-5"
            />
          </div>
        </div>

        {/* text */}
        <div
          ref={textContainer}
          className="mx-auto w-[94vw] max-w-[500px] pb-[60px] pt-[150px] md:max-w-[600px] md:pb-[100px] lg:mx-0 lg:max-w-[500px] lg:space-y-[40vh] lg:py-[40vh] lg:pb-[25vh] lg:text-start xl:max-w-[600px] 2xl:max-w-[650px]"
        >
          {ABOUT_ME_PARAGRAPHS.map(({ title, text }, i) => (
            <Fragment key={i}>
              {/* small screen progress line */}
              <div className="relative mb-[100px] mt-[250px] flex items-center gap-x-[5%] overflow-hidden opacity-80 first-of-type:mt-0 lg:h-0">
                {/* animating line */}
                <motion.div
                  className="h-[2px] origin-left rounded-full bg-black"
                  style={{
                    width: ((i + 1) / ABOUT_ME_PARAGRAPHS.length) * 60 + "%",
                    scaleX: linesProgress[i],
                  }}
                />
                {/* palceholder */}
                <div
                  className="absolute h-[2px] rounded-full bg-black/20"
                  style={{
                    width: ((i + 1) / ABOUT_ME_PARAGRAPHS.length) * 60 + "%",
                  }}
                />
                {/* paragraph number */}
                <motion.p style={{ opacity: linesProgress[i] }}>
                  {i + 1}
                </motion.p>
              </div>

              {/* text */}
              <Paragraph
                parallax={titleParallaxes[i]}
                title={title}
                text={text}
              />
            </Fragment>
          ))}
        </div>
      </section>
    </>
  );
}

// Paragraph Component to render each paragraph with title and text
function Paragraph({
  title,
  text,
  parallax,
}: {
  title: string;
  text: string;
  parallax: MotionValue<number>;
}) {
  const divElement = useRef(null);
  const isInView = useInView(divElement, {
    once: true,
    margin: "-10%",
  });

  return (
    <div className="flex flex-col justify-center">
      <div ref={divElement}>
        <motion.div style={{ y: parallax }}>
          <Title isInView={isInView}>{title}</Title>
        </motion.div>
        <Text>{text}</Text>
      </div>
    </div>
  );
}

// Title Component for each paragraph title with reveal animation
function Title({
  children,
  isInView,
}: {
  children: string;
  isInView: boolean;
} & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <motion.h2 className="mb-2 text-[min(9vw,36px)] font-medium md:mb-5 md:text-4xl xl:mb-4 xl:text-4xl">
      {/* Animating individual letters of the title */}
      {children.split("").map((letter, i) => {
        return (
          <motion.span
            key={i}
            className="inline-block origin-center whitespace-pre font-semibold"
            initial={{ rotateX: 90, opacity: 0, y: "-10px" }}
            animate={isInView ? { rotateX: 0, opacity: 1, y: "0" } : {}}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: i * (0.3 / children.length),
            }}
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.h2>
  );
}

// Text Component to animate words individually within the paragraph
function Text({ children }: { children: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start end", "end 85%"],
  });

  // Mark animation as complete when the scroll reaches the end of the paragraph
  const [animationComplete, setAnimationComplete] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 1) {
        setAnimationComplete(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Word Component to animate each word the first time only
  const words = children.split(" ");
  function Word({
    children,
    range,
  }: {
    children: string;
    range: [number, number];
  }) {
    const opacity = useTransform(scrollYProgress, range, [0.15, 1]);
    return (
      <motion.span
        style={{ opacity: animationComplete ? 1 : opacity }}
        className="me-[min(2vw,9px)] md:me-3"
      >
        {children}
      </motion.span>
    );
  }

  return (
    <p
      ref={paragraphRef}
      className="flex flex-wrap gap-y-0 text-[min(6vw,26px)] opacity-80 md:gap-y-2 md:text-3xl lg:justify-start lg:text-[28px] xl:text-3xl"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <Word key={i} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
