import { useMotionValueEvent, useScroll, motion } from "framer-motion";
import { useRef, useState } from "react";

export default function ProcessSection() {
    const imagesContainerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: imagesContainerRef,
      offset: ["start start", "end end"],
    });
    const [progress, setProgress] = useState("0%");
    const [translateValues, setTranslateValues] = useState([
      "0%",
      "-100%",
      "-100%",
    ]);
    useMotionValueEvent(scrollYProgress, "change", () => {
      if (scrollYProgress.get() >= 0.75) {
        setProgress("-66.66%");
        setTranslateValues(["-100%", "-100%", "0%"]);
      } else if (scrollYProgress.get() >= 0.25) {
        setProgress("-33.33%");
        setTranslateValues(["-100%", "0%", "100%"]);
      } else {
        setProgress("0%");
        setTranslateValues(["0%", "100%", "100%"]);
      }
    });
  
    return (
      <section className="side-padding 2xl-gap-x-20 mt-30 flex flex-col items-start justify-between pb-40 md:flex-row md:gap-x-8 lg:mt-40 lg:gap-x-12 xl:mt-60 xl:gap-x-16 2xl:mt-80">
        {/* text */}
        <div className="mx-auto flex  w-[min(100%,450px)] flex-col space-y-14 sm:w-[500px] md:sticky md:top-20 h-[unset] md:h-[60vw] md:w-[40%] lg:h-[50vw] lg:w-1/2">
          {/* title */}
          <p className="text-4xl font-medium md:ms-4">The Process</p>
          {/* counter */}
          <div className="hidden h-[19vw] items-start overflow-hidden text-center text-[22vw] leading-[0.8] font-semibold md:flex">
            <span>0</span>
            <motion.div
              className="inline-block"
              animate={{ translateY: progress }}
              transition={{ duration: 0.6, ease: "easeIn" }}
            >
              <span className="mb-20 block">1</span>
              <span className="mb-20 block">2</span>
              <span className="mb-20 block">3</span>
            </motion.div>
          </div>
          <div className="relative hidden text-[2vw] leading-[1.3] md:block">
            <p className="absolute top-0 mb-8">
              {"This is some text explaining step 1. This is some text explaining step 1."
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      animate={{ translateY: translateValues[0] }}
                      transition={{ duration: 0.4, ease: "easeIn" }}
                      className="inline-block whitespace-pre"
                    >
                      {word}{" "}
                    </motion.span>
                  </span>
                ))}
            </p>
            <p className="absolute top-0 mb-8 overflow-hidden">
              {"This is some text explaining step 2."
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      animate={{ translateY: translateValues[1] }}
                      transition={{ duration: 0.4, ease: "easeIn" }}
                      className="inline-block whitespace-pre"
                    >
                      {word}{" "}
                    </motion.span>
                  </span>
                ))}
            </p>
            <p className="absolute top-0 mb-8 overflow-hidden">
              {"This is some text explaining step 3. This is some text explaining step 3. This is some text explaining step 3."
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                      animate={{ translateY: translateValues[2] }}
                      transition={{ duration: 0.4, ease: "easeIn" }}
                      className="inline-block whitespace-pre"
                    >
                      {word}{" "}
                    </motion.span>
                  </span>
                ))}
            </p>
          </div>
        </div>
  
        {/* images */}
        <div
          ref={imagesContainerRef}
          className="mx-auto flex w-[min(100%,450px)] shrink-0 flex-col gap-y-[15vw] sm:w-[500px] md:mx-0 md:w-[60%] md:gap-y-10 lg:w-1/2 lg:gap-y-14 xl:gap-y-20"
        >
          <div>
            <img
              src="/"
              alt=""
              className="bg-placeholder aspect-square w-full rounded-xl shadow-2xl xl:rounded-2xl"
            />
            <p className="my-3 text-lg leading-[1.2] sm:text-xl md:hidden">
              This is some text explaining step 1.
            </p>
          </div>
          <div>
            <img
              src="/"
              alt=""
              className="bg-placeholder aspect-square w-full rounded-xl shadow-2xl"
            />
            <p className="my-3 text-lg leading-[1.2] sm:text-xl md:hidden">
              This is some text explaining step 1.
            </p>
          </div>
          <div>
            <img
              src="/"
              alt=""
              className="bg-placeholder aspect-square w-full rounded-xl shadow-2xl"
            />
            <p className="my-3 text-lg leading-[1.2] sm:text-xl md:hidden">
              This is some text explaining step 1.
            </p>
          </div>
        </div>
      </section>
    );
  }