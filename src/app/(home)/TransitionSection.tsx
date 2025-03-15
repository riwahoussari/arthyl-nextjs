import { HORIZONTAL_SCROLL_IMAGES } from "@/utils/constants"
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useScroll,
  useTransform,
  VariantLabels,
} from "motion/react"
import { useEffect, useRef, useState } from "react"

export default function TransitionSection({ bgColor }: { bgColor: string }) {
  return (
    <>
      <StoryText />
      <Images />
      <HorseSection bgColor={bgColor} />
    </>
  )
}

const horseSectionText1 =
  "The horse is a timeless symbol of strength, stability, and endurance. It represents the power to push forward, to overcome obstacles, and to stay grounded no matter the challenges ahead. Horses have long been associated with resilience and determination—qualities that define success in both life and business. This piece embodies that unwavering force, reminding us that true progress starts with a strong foundation."
const horseSectionText2 =
  "Wings represent freedom, ambition, and limitless potential. They elevate the grounded power of the horse, allowing it to soar beyond limitations. Just as ambition lifts us beyond the ordinary, the wings symbolize the ability to break barriers, rise above challenges, and explore new heights. This fusion of strength and flight creates a powerful symbol of balance—staying rooted while daring to reach beyond. It’s a reminder that success is not just about stability, but also about the courage to take flight."
const horseSectionText3 =
  "Obsidian represents mystery, strength, and transformation. Its deep black color symbolizes the unknown and the courage to face it. The obsidian winged horse embodies power and resilience, a guardian-like presence that stands firm through challenges. More than a color, black is a statement—of independence, ambition, and untapped potential waiting to rise."

function StoryText() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: sectionYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return sectionYProgress.on("change", (progress) => {
      setProgress(progress)
    })
  }, [sectionYProgress])

  type AnimType =
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined

  const text1Anim: AnimType =
    (progress < 0.33 && { y: "0%", rotateX: "0deg", opacity: 1 }) ||
    (progress >= 0.33 && { y: "-100%", rotateX: "90deg", opacity: 0 })

  const text2Anim: AnimType =
    (progress < 0.33 && { y: "100%", rotateX: "-90deg", opacity: 0 }) ||
    (progress < 0.66 && { y: "0%", rotateX: "0deg", opacity: 1 }) ||
    (progress < 1 && { y: "-100%", rotateX: "90deg", opacity: 0 })

  const height = useTransform(sectionYProgress, [0.7, 1], ["50%", "0%"])

  return (
    <div ref={sectionRef} className="bg-red-20 relative z-2 h-[200vh] w-full">
      <div className="sticky top-0 flex h-dvh items-center">
        {/* animating text */}
        <div className="relative w-full overflow-hidden">
          <motion.p
            className="absolute w-full text-center text-[6vw] font-semibold capitalize lg:text-[min(100px,5vw)]"
            animate={text1Anim}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
          >
            There's a story
          </motion.p>
          <motion.p
            className="absolute w-full text-center text-[6vw] font-semibold capitalize lg:text-[min(100px,5vw)]"
            animate={text2Anim}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
          >
            behind each horse
          </motion.p>

          {/* placeholder text */}
          <p className="truncate text-[6vw] font-semibold capitalize opacity-0 lg:text-[min(100px,5vw)]">
            There's a story behind each horse
          </p>
        </div>
        {/* opening doors */}
        <motion.div
          className="absolute top-0 left-0 -z-1 h-1/2 w-full bg-beige"
          style={{ height }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 -z-1 h-1/2 w-full bg-beige"
          style={{ height }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
    </div>
  )
}

function Images() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // horizontal scroll
  const scale = useTransform(scrollYProgress, [0, 0.26], [0.7, 1])
  const right = useTransform(scrollYProgress, [0.26, 0.75], ["100%", "0%"])
  const translateX = useTransform(scrollYProgress, [0.26, 0.75], ["100%", "0%"])

  // zoom in Transition

  // code to change the statring width of the zoomInWidth useTransform
  const breakpoints = [
    { query: "(min-width: 1536px)", value: "45vw" }, // Large Screens
    { query: "(min-width: 1024px)", value: "55vw" }, // Small Laptops
    { query: "(min-width: 768px)", value: "70vw" }, // Tablets
    { query: "(max-width: 768px)", value: "85vw" }, // Mobile (small)
  ]
  const getStartWidth = () => {
    for (const bp of breakpoints) {
      if (window.matchMedia(bp.query).matches) {
        return bp.value
      }
    }
  }

  const [startWidth, setStartWidth] = useState<string | undefined>(undefined)

  useEffect(() => {
    setStartWidth(getStartWidth())
  }, [])

  useEffect(() => {
    const mediaQueries = breakpoints.map((bp) => ({
      query: window.matchMedia(bp.query),
      value: bp.value,
    }))

    const handleChange = () => {
      setStartWidth(getStartWidth())
    }

    mediaQueries.forEach((mq) =>
      mq.query.addEventListener("change", handleChange)
    )

    return () => {
      mediaQueries.forEach((mq) =>
        mq.query.removeEventListener("change", handleChange)
      )
    }
  }, [])

  const zoomInWidth = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    [startWidth, "100vw"]
  )

  const zoomInHeight = useTransform(
    scrollYProgress,
    [0.75, 0.8],
    ["60vh", "100vh"]
  )
  const zoomInBgScale = useTransform(scrollYProgress, [0.75, 1], [1, 4.8])
  const zoomInHorseScale = useTransform(scrollYProgress, [0.75, 1], [1, 3])
  const zoomInBgOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0])

  const imgContainerRef = useRef<HTMLDivElement>(null)

  // immediately turn opacity to 0 at the end
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      setIsAtBottom(progress >= 1) // True when at the bottom, false otherwise
    })

    return () => unsubscribe() // Cleanup when component unmounts
  }, [scrollYProgress])

  return (
    <section
      ref={sectionRef}
      className="relative z-1 -mt-[170vh] h-[400vh] bg-black"
      style={{ opacity: isAtBottom ? 0 : 1 }}
    >
      <div
        ref={imgContainerRef}
        className="sticky top-0 z-1 flex h-dvh items-center overflow-hidden"
      >
        <motion.div
          className="relative mx-auto flex h-dvh w-[85vw] items-center md:w-[70vw] lg:w-[55vw] 2xl:w-[45vw]"
          style={{ width: zoomInWidth }}
        >
          <motion.div
            className="absolute origin-right"
            style={{ right, translateX, scale }}
          >
            <div className="relative flex items-center gap-20">
              {HORIZONTAL_SCROLL_IMAGES.map(
                ({ src, width, special, back, front, horse }, i) =>
                  i !== HORIZONTAL_SCROLL_IMAGES.length - 1 ? (
                    // img with zoom in transition to next section
                    special ? (
                      <motion.div
                        key={i}
                        className={`relative z-1 h-[60vh] w-[85vw] shrink-0 overflow-hidden bg-beige md:w-[70vw] lg:w-[55vw] 2xl:w-[45vw]`}
                        style={{ height: zoomInHeight, width: zoomInWidth }}
                      >
                        <motion.img
                          src={front}
                          className="absolute right-1/2 bottom-1/2 z-1 h-full min-h-[60vh] w-full min-w-[140vw] translate-1/2 object-cover sm:min-w-[100vw] md:min-w-[80vw] lg:min-w-[60vw] 2xl:min-w-[45vw]"
                          style={{ scale: zoomInBgScale }}
                        />
                        <motion.img
                          src={back}
                          className="absolute right-1/2 bottom-1/2 z-0 h-full min-h-[60vh] w-full min-w-[140vw] translate-1/2 object-cover sm:min-w-[100vw] md:min-w-[80vw] lg:min-w-[60vw] 2xl:min-w-[45vw]"
                          style={{
                            scale: zoomInBgScale,
                            opacity: zoomInBgOpacity,
                          }}
                        />
                        <motion.img
                          src={horse}
                          className="absolute overflow-visible right-1/2 bottom-1/2 z-2 min-h-[14vh] w-[33vw] max-w-[min(130.33vh,133px)] translate-1/2 object-cover sm:w-[23vw] md:w-[19vw] lg:w-[14vw] lg:max-w-none 2xl:w-[10vw]"
                          style={{ scale: zoomInHorseScale }}
                        />
                      </motion.div>
                    ) : (
                      // normal img
                      <div
                        key={i}
                        className={`flex shrink-0 items-center overflow-hidden ${
                          width === "sm"
                            ? "w-[min(480px,90vw)] sm:w-[70vw] md:w-[400px] lg:w-[450px] 2xl:w-[520px]"
                            : "w-[100vw] sm:w-[90vw] md:w-[600px] lg:w-[700px] 2xl:w-[840px]"
                        }`}
                      >
                        <img src={src} className="w-full object-contain" />
                      </div>
                    )
                  ) : (
                    // last img
                    <div
                      key={i}
                      className={`absolute left-[100%] z-0 ms-20 flex shrink-0 items-center overflow-hidden ${
                        width === "sm"
                          ? "w-[min(480px,90vw)] sm:w-[70vw] md:w-[400px] lg:w-[450px] 2xl:w-[520px]"
                          : "w-[100vw] sm:w-[90vw] md:w-[600px] lg:w-[700px] 2xl:w-[840px]"
                      }`}
                    >
                      <img src={src} className="w-full object-contain" />
                    </div>
                  )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function HorseSection({ bgColor }: { bgColor: string }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on("change", (progress) => {
      setProgress(progress)
    })
  }, [scrollYProgress])

  function getRanges() {
    const vw = window.innerWidth
    if (vw >= 1560) {
      return {
        width: [0.3 * vw + "px", "700px"],
        translateX: ["49%", "-15%"],
        translateY: ["50%", "50%"],
      }
    } else if (vw >= 1280) {
      return {
        width: [0.42 * vw + "px", "560px"],
        translateX: ["49%", "-10%"],
        translateY: ["50%", "50%"],
      }
    } else if (vw >= 1024) {
      return {
        width: [0.42 * vw + "px", "480px"],
        translateX: ["49%", "-7.5%"],
        translateY: ["50%", "50%"],
      }
    } else if (vw >= 768) {
      return {
        width: [0.57 * vw + "px", "450px"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      }
    } else if (vw >= 640) {
      return {
        width: [0.69 * vw + "px", "400px"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      }
    } else {
      return {
        width: ["99vw", "90vw"],
        translateX: ["49%", "49%"],
        translateY: ["50%", "-10%"],
      }
    }
  }
  const [ranges, setRanges] = useState<
    | {
        width: string[]
        translateX: string[]
        translateY: string[]
      }
    | undefined
  >(undefined)

  useEffect(() => {
    setRanges(getRanges())
  })

  useEffect(() => {
    function updateRanges() {
      setRanges(getRanges())
    }
    window.addEventListener("resize", updateRanges)
    return () => window.removeEventListener("resize", updateRanges)
  }, [])

  // horse
  const width = useTransform(
    scrollYProgress,
    [0, 0.33],
    ranges?.width || ["", ""]
  )
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.33],
    ranges?.translateX || ["", ""]
  )
  const translateY = useTransform(
    scrollYProgress,
    [0, 0.33],
    ranges?.translateY || ["", ""]
  )
  const scale = useTransform(scrollYProgress, [0, 0.33], [1, 0.66])

  // w --- h --- y
  const clipPath = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["rect(0px 8% 100% 0px)", "rect(0px 100% 100% 0px)"]
  )

  const wingsAnim =
    (progress < 0.33 && { scale: 1, opacity: 1 }) ||
    (progress >= 0.33 && progress < 0.55 && { scale: 1, opacity: 0.5 }) ||
    (progress >= 0.55 && progress < 0.77 && { scale: 1.5, opacity: 1 }) ||
    (progress >= 0.77 && { scale: 1.25, opacity: 1 })

  const bodyAnim =
    (progress < 0.33 && { scale: 1, opacity: 1 }) ||
    (progress >= 0.33 && progress < 0.55 && { scale: 1.5, opacity: 1 }) ||
    (progress >= 0.55 && progress < 0.77 && { scale: 1, opacity: 0.5 }) ||
    (progress >= 0.77 && { scale: 1.25, opacity: 1 })

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
          className="absolute right-1/2 bottom-1/2 min-h-[42vh] max-w-[min(45vh,400px)] object-cover lg:max-w-none"
        >
          <motion.img
            src="horse-wings.png"
            className="w-full"
            animate={wingsAnim}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          />
        </motion.div>
        {/* horse body */}
        <motion.div
          style={{ width, translateX, translateY, scale }}
          className="absolute right-1/2 bottom-1/2 min-h-[42vh] max-w-[min(45vh,400px)] object-cover lg:max-w-none"
        >
          <motion.img
            src="horse-body.png"
            className="w-full"
            animate={bodyAnim}
            transition={{ ease: "easeInOut", duration: 0.6 }}
          />
        </motion.div>

        {/* text */}
        <motion.div
          className="absolute bottom-[5%] left-1/2 flex min-h-[50vh] w-full max-w-[500px] -translate-x-1/2 flex-col items-center text-center backdrop-blur-sm sm:max-w-[720px] lg:top-1/2 lg:bottom-[unset] lg:w-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:items-start lg:text-start"
          style={
            progress >= 0.33
              ? {
                  backgroundColor:
                    "color-mix(in oklab, var(--color-beige) 20%, transparent",
                }
              : { backgroundColor: "transparent", backdropFilter: "none" }
          }
          transition={{ ease: "easeInOut", duration: 0, delay: 0.4 }}
        >
          {/* w -- h -- y */}
          {/* grey */}
          <div className="absolute flex w-[80%] items-center justify-between gap-4 overflow-y-hidden text-2xl font-semibold opacity-30 sm:gap-8 sm:text-3xl xl:text-4xl">
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
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
              transition={{ ease: "easeInOut", duration: 0.4 }}
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
              transition={{ ease: "easeInOut", duration: 0.4 }}
            >
              Y
            </motion.span>
          </div>
          {/* black */}
          <motion.div
            className="flex w-[80%] items-center justify-between gap-4 text-2xl font-medium sm:gap-8 sm:text-3xl xl:text-4xl"
            style={{ clipPath: clipPath }}
          >
            <motion.span
              animate={{ translateY: progress >= 0.33 ? "0" : "100%" }}
              transition={{ ease: "easeInOut", duration: 0.4 }}
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
              transition={{ ease: "easeInOut", duration: 0.4 }}
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
              transition={{ ease: "easeInOut", duration: 0.4 }}
            >
              Y
            </motion.span>
          </motion.div>

          {/* WHY HORSE */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.4 }}
            animate={{
              display: progress >= 0.33 && progress < 0.55 ? "unset" : "none",
            }}
          >
            {/* title */}
            <p className="origin-left overflow-y-hidden text-4xl leading-[1.4] font-semibold uppercase sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <motion.span
                animate={{
                  translateY:
                    progress >= 0.33 && progress < 0.55 ? "0" : "100%",
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: progress >= 0.33 && progress < 0.55 ? 0.4 : 0,
                }}
                className="inline-block"
              >
                horse?
              </motion.span>
            </p>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {horseSectionText1.split(" ").map((word, i) => (
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
                      delay: progress >= 0.33 && progress < 0.55 ? 0.4 : 0,
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>
          {/* WHY WINGS */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.4 }}
            animate={{
              display: progress >= 0.55 && progress < 0.77 ? "unset" : "none",
            }}
          >
            {/* title */}
            <p className="origin-left overflow-y-hidden text-4xl leading-[1.4] font-semibold uppercase sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <motion.span
                animate={{
                  translateY:
                    progress >= 0.55 && progress < 0.77 ? "0" : "100%",
                }}
                transition={{
                  duration: 0.4,
                  delay: progress >= 0.55 && progress < 0.77 ? 0.4 : 0,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                wings?
              </motion.span>
            </p>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {horseSectionText2.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-y-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{
                      translateY:
                        progress >= 0.55 && progress < 0.77 ? "0" : "100%",
                    }}
                    transition={{
                      duration: 0.4,
                      delay: progress >= 0.55 && progress < 0.77 ? 0.4 : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {word}{" "}
                  </motion.span>
                </span>
              ))}
            </p>
          </motion.div>
          {/* WHY OBSIDIAN */}
          <motion.div
            className="mt-3"
            transition={{ duration: 0, delay: 0.4 }}
            animate={{
              display: progress >= 0.77 ? "unset" : "none",
            }}
          >
            {/* title */}
            <p className="origin-left overflow-y-hidden text-4xl leading-[1.4] font-semibold uppercase sm:text-5xl xl:text-6xl 2xl:text-7xl">
              <motion.span
                animate={{ translateY: progress >= 0.77 ? "0" : "100%" }}
                transition={{
                  duration: 0.4,
                  delay: progress >= 0.77 ? 0.4 : 0,
                  ease: "easeInOut",
                }}
                className="inline-block"
              >
                obsidian?
              </motion.span>
            </p>

            {/* text */}
            <p className="mx-auto mt-0 text-base leading-[1.2] opacity-70 sm:w-[95%] sm:text-lg sm:leading-[1.4] md:text-xl lg:mx-0 lg:text-lg xl:mt-10 xl:text-xl 2xl:text-2xl 2xl:leading-[1.3]">
              {horseSectionText3.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-y-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{ translateY: progress >= 0.77 ? "0" : "100%" }}
                    transition={{
                      duration: 0.4,
                      delay: progress >= 0.77 ? 0.4 : 0,
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
  )
}
