"use client"
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useTransform,
} from "motion/react"
import PageTitle from "../../components/global/PageTitle"
import { Fragment, HTMLAttributes, useEffect, useRef, useState } from "react"
import { ABOUT_ME_PARAGRAPHS } from "../../utils/constants"
import Frame4by5 from "./Frame4by5Svg"

export default function AboutPage() {
  const container = useRef(null)
  const { scrollYProgress: textYProgress } = useScroll({
    target: container,
    offset: ["start center", "end 0.9"],
  })
  const titleParallaxes = [
    [0, 0.25],
    [0.25, 0.5],
    [0.5, 0.75],
    [0.75, 1],
  ].map((range) => {
    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    return useTransform(
      textYProgress,
      range,
      isClient && window.innerWidth > 768 ? [20, -30] : [15, -25]
    );
  });
  const opacityParallaxes = [
    [0, 0.2],
    [0.3, 0.45],
    [0.55, 0.7],
    [0.8, 0.95],
  ].map((range) => useTransform(textYProgress, range, [0, 1]))

  return (
    <>
      <PageTitle>ABOUT ME</PageTitle>
      <section
        ref={container}
        className=" lg:flex lg:items-start lg:justify-center lg:gap-[6vw] xl:gap-26 2xl:gap-40"
      >
        {/* img */}
        <div className="mx-auto w-[94vw] max-w-[500px] lg:sticky lg:top-0 lg:mx-0 lg:h-dvh lg:w-[min(380px,max(60vh,350px))] lg:pt-[calc(_(100vh-475px)/2_+30px)] xl:w-[400px] xl:pt-[calc(_(100vh-500px)/2_+24px)] ">
          <div className="relative">
            {/* <motion.div style={{ clipPath }}> */}
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeInOut" }}
            >
              <img
                className={`aspect-4/5 w-full object-cover object-bottom`}
                src="/Arthyl-Ahmad.webp"
                alt=""
              />
            </motion.div>
            <Frame4by5
              progress={textYProgress}
              className="absolute top-1/2 -right-6 -left-6 hidden -translate-y-1/2 lg:-right-4 lg:-left-4 lg:block xl:-right-5 xl:-left-5"
            />
          </div>
        </div>
        {/* text */}
        <div className="mx-auto w-[94vw] max-w-[500px] pt-[150px] pb-[60px] md:pb-[100px] md:max-w-[600px] lg:mx-0 lg:max-w-[500px] lg:space-y-[40vh] lg:py-[40vh] lg:pb-[25vh] lg:text-start xl:max-w-[600px] 2xl:max-w-[650px] ">
          {ABOUT_ME_PARAGRAPHS.map(({ title, text }, i) => (
            <Fragment key={i}>
              {/* line */}
              <div className="relative flex gap-x-[5%] items-center lg:h-0 overflow-hidden mt-[250px] mb-[100px] first-of-type:mt-0 opacity-80">
                <motion.div
                  className="h-[2px] rounded-full bg-black origin-left"
                  style={{
                    width: ((i + 1) / ABOUT_ME_PARAGRAPHS.length) * 60 + "%",
                    scaleX: opacityParallaxes[i],
                  }}
                />
                <div
                  className="h-[2px] rounded-full bg-black/20 absolute"
                  style={{
                    width: ((i + 1) / ABOUT_ME_PARAGRAPHS.length) * 60 + "%",
                  }}
                />
                <motion.p style={{ opacity: opacityParallaxes[i] }}>
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
  )
}

function Paragraph({
  title,
  text,
  parallax,
}: {
  title: string
  text: string
  parallax: MotionValue<number>
}) {
  const divElement = useRef(null)
  let isInView = useInView(divElement, {
    once: false,
    margin: "-10%"
  })

  return (
    <div className="flex flex-col justify-center">
      <div ref={divElement}>
        <motion.div style={{ y: parallax }}>
          <Title isInView={isInView}>{title}</Title>
        </motion.div>
        <Text>{text}</Text>
      </div>
    </div>
  )
}

function Title({
  children,
  isInView,
}: {
  children: string
  isInView: boolean
} & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <motion.h2 className="mb-2 text-[min(9vw,36px)] font-medium md:mb-5 md:text-4xl xl:mb-4 xl:text-4xl">
      {children.split("").map((letter, i) => {
        return (
          <motion.span
            key={i}
            className="inline-block origin-center whitespace-pre"
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
        )
      })}
    </motion.h2>
  )
}

function Text({ children }: { children: string }) {
  const words = children.split(" ")
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start end", "end 85%"],
  })

  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v >= 1) {
        setAnimationComplete(true)
      }
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  function Word({
    children,
    range,
  }: {
    children: string
    range: [number, number]
  }) {
    let opacity = useTransform(scrollYProgress, range, [0.15, 1])
    return (
      <motion.span
        style={{ opacity: animationComplete ? 1 : opacity }}
        className="me-[min(2vw,9px)] md:me-3"
      >
        {children}
      </motion.span>
    )
  }

  return (
    <p
      ref={paragraphRef}
      className="flex flex-wrap gap-y-0 text-[min(6vw,26px)] opacity-80 md:gap-y-2 md:text-3xl lg:justify-start lg:text-[28px] xl:text-3xl"
    >
      {words.map((word, i) => {
        let start = i / words.length
        let end = (i + 1) / words.length
        return (
          <Word key={i} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}
