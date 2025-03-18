import { HOME_PROCESS_SECTION_STEPS } from "@/utils/images";
import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Calculate the size of each scroll segment (block) relative to the total scrollable area
const imgSizePercentage = 1 / (HOME_PROCESS_SECTION_STEPS.length - 1);

// Distribute the segment sizes, giving the first and last steps half a segment size
const imgSizes = HOME_PROCESS_SECTION_STEPS.map((_, i) =>
  i == 0 || i == HOME_PROCESS_SECTION_STEPS.length - 1
    ? imgSizePercentage / 2
    : imgSizePercentage
);

// Stores scroll positions and corresponding translation values
const scrollMarkers: { marker: number; counterTranslate: number }[] = [];

for (let i = 0; i < imgSizes.length - 1; i++) {
  const marker = imgSizes[i] + (i > 0 ? scrollMarkers[i - 1].marker : 0);
  const scrollValue = (100 / HOME_PROCESS_SECTION_STEPS.length) * (i + 1);

  scrollMarkers.push({
    marker: Math.round(marker * 100) / 100,
    counterTranslate: Math.round(scrollValue * 100) / 100,
  });
}

export default function ProcessSection() {
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imagesContainerRef,
    offset: ["start start", "end end"],
  });

  // State to track the scroll-based counter position
  const [counterScrollPosition, setCounterScrollPosition] = useState("0%");

  // State for text translation values, updated on scroll
  const [translateValues, setTranslateValues] = useState([""]);

  // Initialize text translation values: first step at "0%", others at "100%"
  useEffect(() => {
    setTranslateValues(
      Array(HOME_PROCESS_SECTION_STEPS.length)
        .fill("")
        .map((_, i) => (i === 0 ? "0%" : "100%"))
    );
  }, []);

  // Iterate through scroll markers in reverse to determine the correct position
  useMotionValueEvent(scrollYProgress, "change", () => {
    let set = false;
    for (let i = scrollMarkers.length - 1; i >= 0; i--) {
      if (scrollYProgress.get() >= scrollMarkers[i].marker) {
        setCounterScrollPosition(`-${scrollMarkers[i].counterTranslate}%`);
        set = true;

        const arr: string[] = [];
        for (let j = 0; j < HOME_PROCESS_SECTION_STEPS.length; j++) {
          if (j - 1 < i) {
            arr.push("-100%");
          } else if (j - 1 == i) {
            arr.push("0%");
          } else {
            arr.push("100%");
          }
        }
        setTranslateValues(arr);
        break;
      }
    }

    // If no condition was met, reset values to default
    if (set === false) {
      setCounterScrollPosition("0%");
      setTranslateValues(
        Array(HOME_PROCESS_SECTION_STEPS.length)
          .fill("")
          .map((_, i) => (i === 0 ? "0%" : "100%"))
      );
    }
  });

  return (
    <section className="side-padding 2xl-gap-x-20 mt-30 flex flex-col items-start justify-between pb-40 md:flex-row md:gap-x-8 lg:mt-40 lg:gap-x-12 xl:mt-60 xl:gap-x-16 2xl:mt-80">
      {/* text */}
      <div className="mx-auto flex h-[unset] w-[min(100%,450px)] flex-col space-y-14 sm:w-[500px] md:sticky md:top-20 md:h-[60vw] md:w-[40%] lg:h-[50vw] lg:w-1/2">
        {/* title */}
        <h2 className="text-4xl font-medium md:ms-4">The Process</h2>

        {/* counter */}
        <div className="hidden h-[19vw] items-start overflow-hidden text-center text-[22vw] font-semibold leading-[0.8] md:flex">
          <span aria-hidden>0</span>
          <motion.div
            className="inline-block"
            animate={{ translateY: counterScrollPosition }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          >
            {HOME_PROCESS_SECTION_STEPS.map((_, i) => (
              <p className="mb-20" key={i} aria-hidden>
                {i + 1}
              </p>
            ))}
          </motion.div>
        </div>

        {/* text */}
        <div className="relative hidden text-[max(1.5vw,18px)] w-[35vw] leading-[1.3] md:block">
          {HOME_PROCESS_SECTION_STEPS.map((step, stepIndex) => (
            <p className="absolute top-0 mb-8" aria-hidden key={stepIndex}>
              {step.text.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    animate={{ translateY: translateValues[stepIndex] }}
                    transition={{ duration: 0.4, ease: "easeIn" }}
                    className="inline-block whitespace-pre"
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      {/* images */}
      <div
        ref={imagesContainerRef}
        className="mx-auto flex w-[min(100%,450px)] shrink-0 flex-col gap-y-[15vw] sm:w-[500px] md:mx-0 md:w-[60%] md:gap-y-20 lg:w-1/2 lg:gap-y-28 xl:gap-y-30"
      >
        {HOME_PROCESS_SECTION_STEPS.map((step, i) => (
          <div key={i}>
            <Image
              src={step.img}
              alt=""
              placeholder="blur"
              className="bg-placeholder aspect-square w-full rounded-xl shadow-2xl xl:rounded-2xl"
            />
            <p className="my-3 text-lg leading-[1.2] sm:text-xl md:sr-only">
              <span className="sr-only">step {i + 1}: </span>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
