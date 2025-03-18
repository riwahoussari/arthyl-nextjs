import { HORSE_SECTION } from "@/utils/text";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useScroll,
  useTransform,
  VariantLabels,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HOME_HORIZONTAL_SCROLL_IMAGES,
  HOME_HORSE_SECTION_IMAGES,
} from "@/utils/images";
import Image from "next/image";

type MotionAnimType =
  | boolean
  | AnimationControls
  | TargetAndTransition
  | VariantLabels
  | undefined;

export default function TransitionSection({ bgColor }: { bgColor: string }) {
  return (
    <>
      <StoryText />
      <HorzontailScrollImages />
      <HorseInfoSection bgColor={bgColor} />
    </>
  );
}

function StoryText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [progress, setProgress] = useState(0);

  // Effect to update progress state based on scroll progress
  useEffect(() => {
    return sectionYProgress.on("change", (progress) => {
      setProgress(progress);
    });
  }, [sectionYProgress]);

  // Text animations (hide/show) based on scroll progress
  const text1Anim: MotionAnimType =
    (progress < 0.15 && { y: "0%", rotateX: "0deg", opacity: 1 }) ||
    (progress >= 0.15 && { y: "-100%", rotateX: "90deg", opacity: 0 });

  const text2Anim: MotionAnimType =
    (progress < 0.15 && { y: "100%", rotateX: "-90deg", opacity: 0 }) ||
    (progress < 0.66 && { y: "0%", rotateX: "0deg", opacity: 1 }) ||
    (progress < 1 && { y: "-100%", rotateX: "90deg", opacity: 0 });

  // Animate the height of "doors" as the user scrolls
  const doorsHeight = useTransform(sectionYProgress, [0.7, 1], ["50%", "0%"]);

  return (
    <div ref={sectionRef} className="bg-red-20 z-2 relative h-[200vh] w-full">
      <div className="sticky top-0 flex h-dvh items-center">
        {/* animated text */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="absolute w-full text-center text-[6vw] font-semibold capitalize lg:text-[min(100px,5vw)]"
            animate={text1Anim}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            aria-hidden
          >
            {"There's a story"}
          </motion.div>
          <motion.div
            className="absolute w-full text-center text-[6vw] font-semibold capitalize lg:text-[min(100px,5vw)]"
            animate={text2Anim}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            aria-hidden
          >
            behind each horse
          </motion.div>

          {/* placeholder text to maintain height */}
          <p className="truncate text-[6vw] font-semibold capitalize opacity-0 lg:text-[min(100px,5vw)]">
            {"There's a story behind each horse"}
          </p>
        </div>

        {/* opening doors */}
        <motion.div
          className="-z-1 bg-beige absolute left-0 top-0 h-1/2 w-full"
          style={{ height: doorsHeight }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.div
          className="-z-1 bg-beige absolute bottom-0 left-0 h-1/2 w-full"
          style={{ height: doorsHeight }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function HorzontailScrollImages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Define transformations for horizontal scroll and initial scale up animation
  const scale = useTransform(scrollYProgress, [0, 0.26], [0.7, 1]);
  const right = useTransform(scrollYProgress, [0.26, 0.75], ["100%", "0%"]);
  const translateX = useTransform(
    scrollYProgress,
    [0.26, 0.75],
    ["100%", "0%"]
  );

  // Responsive breakpoints for initial horse image width
  const breakpoints = useMemo(() => ([
    { query: "(min-width: 1536px)", value: "45vw" }, // Large Screens
    { query: "(min-width: 1024px)", value: "55vw" }, // Small Laptops
    { query: "(min-width: 768px)", value: "70vw" }, // Tablets
    { query: "(max-width: 768px)", value: "85vw" }, // Mobile (small)
  ]), []);
  // get horse image width dynamically based on screen size
  const getHorseStartWidth = useCallback(() => {
    for (const bp of breakpoints) {
      if (window.matchMedia(bp.query).matches) {
        return bp.value;
      }
    }
  }, [breakpoints]);

  const [horsestartWidth, setHorseStartWidth] = useState<string | undefined>();
  // set initial horseStartWidth and update on screen resize
  useEffect(() => {
    const handleResize = () => {
      setHorseStartWidth(getHorseStartWidth());
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getHorseStartWidth]);

  // Zoom-in animations for the horse image
  const zoomInWidth = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    [horsestartWidth, "100vw"]
  );
  const zoomInHeight = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    ["60vh", "100vh"]
  );
  const zoomInBgScale = useTransform(scrollYProgress, [0.75, 1], [1, 4.8]);
  const zoomInHorseScale = useTransform(scrollYProgress, [0.75, 1], [1, 3]);
  const zoomInBgOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  // immediately turn opacity to 0 at the end to transition to the next section which will look exactly the same
  const [isAtBottom, setIsAtBottom] = useState(false);
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      setIsAtBottom(progress >= 1);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    //section has negative margin top to start behind the opening doors of the previous section which is still sticky on screen
    <section
      ref={sectionRef}
      className="z-1 relative -mt-[170vh] h-[400vh] bg-black"
      style={{ opacity: isAtBottom ? 0 : 1 }}
    >
      <div className="z-1 sticky top-0 flex h-dvh items-center overflow-hidden">
        <motion.div
          className="relative mx-auto flex h-dvh w-[85vw] items-center md:w-[70vw] lg:w-[55vw] 2xl:w-[45vw]"
          style={{ width: zoomInWidth }}
        >
          <motion.div
            className="absolute origin-right"
            style={{ right, translateX, scale }}
          >
            <div className="relative flex items-center gap-20">
              {HOME_HORIZONTAL_SCROLL_IMAGES.map((img, i) =>
                // ({ src, width, special, back, front, horse }, i) =>
                // horse img with zoom in transition to next section
                img.special ? (
                  <motion.div
                    key={i}
                    className="z-1 bg-beige relative h-[60vh] w-[85vw] shrink-0 overflow-hidden md:w-[70vw] lg:w-[55vw] 2xl:w-[45vw]"
                    style={{ height: zoomInHeight, width: zoomInWidth }}
                  >
                    <motion.div
                      style={{ scale: zoomInBgScale }}
                      className="z-1 translate-1/2 absolute bottom-1/2 right-1/2 h-full min-h-[60vh] w-full min-w-[140vw] sm:min-w-[100vw] md:min-w-[80vw] lg:min-w-[60vw] 2xl:min-w-[45vw]"
                    >
                      <Image
                        src={img.front}
                        alt=""
                        aria-hidden
                        placeholder="blur"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>

                    <motion.div
                      className="translate-1/2 absolute bottom-1/2 right-1/2 z-0 h-full min-h-[60vh] w-full min-w-[140vw] sm:min-w-[100vw] md:min-w-[80vw] lg:min-w-[60vw] 2xl:min-w-[45vw]"
                      style={{
                        scale: zoomInBgScale,
                        opacity: zoomInBgOpacity,
                      }}
                    >
                      <Image
                        src={img.back}
                        alt=""
                        aria-hidden
                        placeholder="blur"
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="z-2 translate-1/2 absolute bottom-1/2 right-1/2 min-h-[14vh] w-[33vw] max-w-[min(130.33vh,133px)] overflow-visible sm:w-[23vw] md:w-[19vw] lg:w-[14vw] lg:max-w-none 2xl:w-[10vw]"
                      style={{ scale: zoomInHorseScale }}
                    >
                      <Image
                        src={img.horse}
                        alt="Image of Obsidian Winged Horse Artpiece."
                        placeholder="blur"
                        className="h-full w-full overflow-visible object-cover"
                      />
                    </motion.div>
                  </motion.div>
                ) : (
                  // normal img
                  <div
                    key={i}
                    className={`flex shrink-0 items-center overflow-hidden ${i == HOME_HORIZONTAL_SCROLL_IMAGES.length - 1 && "absolute left-[100%] z-0 ms-20"} ${
                      img.width === "sm"
                        ? "w-[min(480px,90vw)] sm:w-[70vw] md:w-[400px] lg:w-[450px] 2xl:w-[520px]"
                        : "w-[100vw] sm:w-[90vw] md:w-[600px] lg:w-[700px] 2xl:w-[840px]"
                    }`}
                  >
                    <Image
                      alt={img.alt}
                      src={img.src}
                      placeholder="blur"
                      className="w-full object-contain"
                    />
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function HorseInfoSection({ bgColor }: { bgColor: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Track Scroll Progress
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (progress) => {
      setProgress(progress);
    });
  }, [scrollYProgress]);

  // Dynamic Transfrom values for horse and wings images based on screen width (image width and position on screen)
  type transformValues = {
    width: string[];
    translateX: string[];
    translateY: string[];
  };
  const getTransformValues: () => transformValues = useCallback(() => {
    const vw = window.innerWidth;
    if (vw >= 1560) {
      return {
        width: [0.3 * vw + "px", "700px"],
        translateX: ["49%", "-15%"],
        translateY: ["50%", "50%"],
      };
    } else if (vw >= 1280) {
      return {
        width: [0.42 * vw + "px", "560px"],
        translateX: ["49%", "-10%"],
        translateY: ["50%", "50%"],
      };
    } else if (vw >= 1024) {
      return {
        width: [0.42 * vw + "px", "480px"],
        translateX: ["49%", "-7.5%"],
        translateY: ["50%", "50%"],
      };
    } else if (vw >= 768) {
      return {
        width: [0.57 * vw + "px", "450px"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      };
    } else if (vw >= 640) {
      return {
        width: [0.69 * vw + "px", "400px"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      };
    } else {
      return {
        width: ["99vw", "90vw"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      };
    }
  }, []);

  const [transfromValues, setTransfromValues] = useState<
    transformValues | undefined
  >();

  // set transform values for horse and wings on initial render and update on screen resize
  useEffect(() => {
    function updateTransfromValues() {
      setTransfromValues(getTransformValues());
    }
    updateTransfromValues();
    window.addEventListener("resize", updateTransfromValues);
    return () => window.removeEventListener("resize", updateTransfromValues);
  }, [getTransformValues]);

  // horse and wings transformations
  const width = useTransform(
    scrollYProgress,
    [0, 0.33],
    transfromValues?.width || ["", ""]
  );
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.33],
    transfromValues?.translateX || ["", ""]
  );
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.33],
    transfromValues?.translateY || ["", ""]
  );
  const scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.66]);

  // w --- h --- y progress bar
  const clipPath = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["rect(0px 8% 100% 0px)", "rect(0px 100% 100% 0px)"]
  );

  // highlight wings/horse/both on scroll
  const wingsAnim =
    (progress < 0.33 && { scale: 1, opacity: 1 }) ||
    (progress >= 0.33 && progress < 0.55 && { scale: 1, opacity: 0.5 }) ||
    (progress >= 0.55 && progress < 0.77 && { scale: 1.5, opacity: 1 }) ||
    (progress >= 0.77 && { scale: 1.25, opacity: 1 });

  const bodyAnim =
    (progress < 0.33 && { scale: 1, opacity: 1 }) ||
    (progress >= 0.33 && progress < 0.55 && { scale: 1.5, opacity: 1 }) ||
    (progress >= 0.55 && progress < 0.77 && { scale: 1, opacity: 0.5 }) ||
    (progress >= 0.77 && { scale: 1.25, opacity: 1 });

  return (
    <motion.section
      ref={sectionRef}
      className="side-padding -mt-[100vh] h-[300vh] w-full"
      animate={{ backgroundColor: bgColor }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="sticky top-0 h-[100vh] overflow-hidden">
        {/* horse wings */}
        <motion.div
          style={{ width, translateX, translateY, scale }}
          className="absolute bottom-1/2 right-1/2 min-h-[42vh] max-w-[min(45vh,400px)] object-cover lg:max-w-none"
        >
          <motion.div
            animate={wingsAnim}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            className="w-full"
          >
            <Image
              src={HOME_HORSE_SECTION_IMAGES.horseWings}
              alt="Image of Obsidian Winged Horse Artpiece"
              placeholder="blur"
              className="w-full"
            />
          </motion.div>
        </motion.div>
        {/* horse body */}
        <motion.div
          style={{ width, translateX, translateY, scale }}
          className="absolute bottom-1/2 right-1/2 min-h-[42vh] max-w-[min(45vh,400px)] object-cover lg:max-w-none"
        >
          <motion.div
            className="w-full"
            animate={bodyAnim}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          >
            <Image
              src={HOME_HORSE_SECTION_IMAGES.horseBody}
              alt="Image of Obsidian Winged Horse Artpiece"
              aria-hidden
              className="w-full"
              placeholder="blur"
            />
          </motion.div>
        </motion.div>

        {/* text */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 flex min-h-[50vh] w-full max-w-[500px] -translate-x-1/2 flex-col items-center text-center backdrop-blur-sm sm:max-w-[720px] lg:bottom-[unset] lg:top-1/2 lg:w-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:items-start lg:text-start"
          style={
            progress >= 0.33
              ? {
                  backgroundColor:
                    "color-mix(in oklab, var(--color-beige) 20%, transparent",
                }
              : { backgroundColor: "transparent", backdropFilter: "none" }
          }
          transition={{ ease: "easeInOut", duration: 0, delay: 0.3}}
        >
          {/* W -- H -- Y PROGRESS BAR */}
          {/* grey - placeholder */}
          <div className="absolute flex w-[80%] items-center justify-between gap-4 overflow-y-hidden text-2xl font-semibold opacity-30 sm:gap-8 sm:text-3xl xl:text-4xl">
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              W
            </motion.span>
            <motion.div
              animate={{
                clipPath:
                  progress >= 0.33
                    ? "rect(0px 100% 100% 0px)"
                    : "rect(0px 100% 100% 100%)",
              }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.2 }}
              className="why-dashes h-[2px] w-full origin-center sm:h-[3px]"
            />
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              H
            </motion.span>
            <motion.div
              animate={{
                clipPath:
                  progress >= 0.33
                    ? "rect(0px 100% 100% 0px)"
                    : "rect(0px 0% 100% 0px)",
              }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.2 }}
              className="why-dashes h-[2px] w-full origin-center sm:h-[3px]"
            />
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              Y
            </motion.span>
          </div>
          {/* black - animating */}
          <motion.div
            className="flex w-[80%] items-center justify-between gap-4 text-2xl font-medium sm:gap-8 sm:text-3xl xl:text-4xl"
            style={{ clipPath: clipPath }}
          >
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              W
            </motion.span>
            <motion.div
              animate={{
                clipPath:
                  progress >= 0.33
                    ? "rect(0px 100% 100% 0px)"
                    : "rect(0px 100% 100% 100%)",
              }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.2 }}
              className="why-dashes h-[2px] w-full origin-center sm:h-[3px]"
            />
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              H
            </motion.span>
            <motion.div
              animate={{
                clipPath:
                  progress >= 0.33
                    ? "rect(0px 100% 100% 0px)"
                    : "rect(0px 0% 100% 0px)",
              }}
              transition={{ ease: "easeInOut", duration: 0.3, delay: 0.2 }}
              className="why-dashes h-[2px] w-full origin-center sm:h-[3px]"
            />
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.3}}
              aria-hidden
            >
              Y
            </motion.span>
          </motion.div>

          {/* HORSE INFO TEXT */}
          {/* why horse? */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.3}}
            animate={{
              display: progress >= 0.33 && progress < 0.55 ? "unset" : "none",
            }}
          >
            {/* title */}
            <h2 className="origin-left overflow-y-hidden text-4xl font-semibold uppercase leading-[1.4] sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <span className="sr-only">WHY</span>
              <motion.span
                animate={{
                  translateY:
                    progress >= 0.33 && progress < 0.55 ? "0" : "100%",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: progress >= 0.33 && progress < 0.55 ? 0.3: 0,
                }}
                className="inline-block"
              >
                {HORSE_SECTION[0].title}?
              </motion.span>
            </h2>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {HORSE_SECTION[0].text.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-y-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{
                      translateY:
                        progress >= 0.33 && progress < 0.55 ? "0" : "100%",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                      delay: progress >= 0.33 && progress < 0.55 ? 0.3: 0,
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>

          {/* why wings? */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.3}}
            animate={{
              display: progress >= 0.55 && progress < 0.77 ? "unset" : "none",
            }}
          >
            {/* title */}
            <h2 className="origin-left overflow-y-hidden text-4xl font-semibold uppercase leading-[1.4] sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <span className="sr-only">WHY</span>
              <motion.span
                animate={{
                  translateY:
                    progress >= 0.55 && progress < 0.77 ? "0" : "100%",
                }}
                transition={{
                  duration: 0.4,
                  delay: progress >= 0.55 && progress < 0.77 ? 0.3: 0,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {HORSE_SECTION[1].title}?
              </motion.span>
            </h2>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {HORSE_SECTION[1].text.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-y-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{
                      translateY:
                        progress >= 0.55 && progress < 0.77 ? "0" : "100%",
                    }}
                    transition={{
                      duration: 0.4,
                      delay: progress >= 0.55 && progress < 0.77 ? 0.3: 0,
                      ease: "easeInOut",
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>

          {/* why color? */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.3}}
            animate={{
              display: progress >= 0.77 ? "unset" : "none",
            }}
          >
            {/* title */}
            <h2 className="origin-left overflow-y-hidden text-4xl font-semibold uppercase leading-[1.4] sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <span className="sr-only">WHY</span>
              <motion.span
                animate={{ translateY: progress >= 0.77 ? "0" : "100%" }}
                transition={{
                  duration: 0.4,
                  delay: progress >= 0.77 ? 0.3: 0,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                {HORSE_SECTION[2].title}?
              </motion.span>
            </h2>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {HORSE_SECTION[2].text.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-y-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{ translateY: progress >= 0.77 ? "0" : "100%" }}
                    transition={{
                      duration: 0.4,
                      delay: progress >= 0.77 ? 0.3: 0,
                      ease: "easeInOut",
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
