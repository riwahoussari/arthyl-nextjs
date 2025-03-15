import { ROTATING_TEXT } from "@/utils/constants"
import { motion } from "motion/react"
import Image from "next/image"
export default function HeroSection() {
  return (
    <section className="side-padding mx-auto max-w-[2000px]">
      {/* headline - huge text */}
      <div className="relative flex items-center justify-center">
        <div className="relative mt-[min(260px,50vw)] md:mt-[20vw] lg:mt-[min(250px,12.5vw)] lg:w-[min(100%,2000px)]">
          <h1 className="bg-white bg-clip-text text-center text-[min(17.5vw,18vw)] leading-[0.8] font-semibold text-transparent mix-blend-difference md:text-[max(110px,12vw)] lg:text-[min(200px,10vw)]">
            A Timeless <br />
            Mark For Growth <br className="hidden lg:block" />& Success
          </h1>

          <video
            src="/winged-horse-video.mp4"
            loop
            muted
            autoPlay
            className="absolute bottom-[85%] left-0 -z-1 aspect-square w-[min(55vw,280px)] rounded-md object-cover md:bottom-[45%] md:aspect-3/4 md:w-[max(220px,25vw)] md:rounded-lg lg:bottom-[25%] lg:w-[min(400px,20vw)]"
          />

          <img
            alt=""
            src="/winged-horse-hero.jpg"
            className="bg-placeholder absolute top-[95%] right-0 -z-1 aspect-5/3 w-[min(60vw,300px)] rounded-md object-cover md:top-[75%] md:w-[max(264px,30vw)] md:rounded-lg lg:top-[66%] lg:w-[min(500px,25vw)]"
          />
        </div>
      </div>

      {/* rotating circular text + up next */}
      <div className="mt-[min(230px,50vw)] flex items-end gap-4 sm:gap-5 md:mt-[10vw] md:gap-6 lg:mt-[min(125px,6vw)]">
        {/* rotating circular text */}
        <div className="relative flex aspect-square w-[120px] shrink-0 items-center justify-center text-lg sm:w-[134px] sm:text-xl md:w-[160px] md:text-2xl">
          {/* fixed text in the middle */}
          <div className="absolute flex aspect-square w-[60px] items-center justify-center text-center leading-[1] font-light sm:w-[67px] md:w-[80px]">
            <p>
              {ROTATING_TEXT.sold_number}/{ROTATING_TEXT.total_number} <br />
              sold
            </p>
          </div>

          {/* rotating text */}
          <motion.div
            className="absolute h-full w-full"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 10, repeat: Infinity }}
          >
            <p>
              {ROTATING_TEXT.text.split("").map((char, i) => (
                <span
                  className="absolute left-1/2 inline-block w-3 origin-[0_60px] text-center font-semibold uppercase select-none sm:w-4 sm:origin-[0_67px] md:w-5 md:origin-[0_80px]"
                  key={i}
                  style={{
                    transform: `rotate(${
                      i * (360 / ROTATING_TEXT.text.length)
                    }deg)`,
                  }}
                >
                  <span style={{ rotate: "8deg", display: "inline-block" }}>
                    {char}
                  </span>
                </span>
              ))}
            </p>
          </motion.div>
        </div>

        {/* next up - cirrus - axiom */}
        <div>
          <p className="text-sm font-light opacity-80 md:text-base">
            next up :
          </p>
          <div className="mt-1.5 flex flex-wrap gap-x-3 text-lg sm:text-xl md:text-2xl">
            <p
              className="flex text-white"
              style={{ textShadow: "0 0 2px rgba(0,0,0,1)" }}
            >
              → CIRRUS
            </p>
            <p className="axiom-text flex">→ AXIOM</p>
          </div>
        </div>
      </div>

      {/* subheadline - paragraph */}
      <div className="mt-40 w-[min(100%,390px)] text-lg sm:w-md sm:text-xl md:w-lg md:text-2xl lg:mt-50 xl:mt-60 xl:w-xl xl:text-3xl">
        <p>
          The First Plexiglass Artist in the Middle East, crafting a unique &
          exclusive art piece for entrepreneurs and leaders.
          <br />
          <br />
          With only a select few ever made, this piece serves as a reminder of
          how far you’ve come and how far you’ll go.
        </p>
      </div>
    </section>
  )
}
