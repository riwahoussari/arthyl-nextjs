import {
  HOME_HERO_HEADLINE,
  // HOME_HERO_NEXT_UP_ARTPIECES,
  // HOME_HERO_ROTATING_TEXT,
  // HOME_HERO_SUB_HEADLINE,
} from "@/utils/text";
import { HERO_GRAPHICS } from "@/utils/images";

import { motion } from "motion/react";
import Image from "next/image";
// import { useRef } from "react";

export default function HeroSection() {
  // const subHeadlineRef = useRef<HTMLDivElement>(null);
  // const isSubHeadlineInView = useInView(subHeadlineRef, { once: true });
  return (
    <>
      <section>
        <div className="flex-center">
          <div className="container">
            <div>
              <h1>
                <span className="inline-block overflow-hidden">
                  <span className="inline-blockwhitespace-pre">
                    {HOME_HERO_HEADLINE}
                  </span>
                </span>
              </h1>
            </div>

            {/* top left img */}
            <motion.div
              className="-z-1 md:aspect-3/4 absolute bottom-[85%] left-0 aspect-square w-[min(55vw,280px)] overflow-hidden rounded-md md:bottom-[45%] md:w-[max(220px,25vw)] md:rounded-lg lg:bottom-[25%] lg:w-[min(400px,20vw)]"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src={HERO_GRAPHICS.topLeftImg.src}
                alt={HERO_GRAPHICS.topLeftImg.alt}
                placeholder="blur"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* top left img */}
            <motion.div
              className="-z-1 md:aspect-3/4 absolute bottom-[85%] left-0 aspect-square w-[min(55vw,280px)] overflow-hidden rounded-md md:bottom-[45%] md:w-[max(220px,25vw)] md:rounded-lg lg:bottom-[25%] lg:w-[min(400px,20vw)]"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <video
                src={HERO_GRAPHICS.topLeftVideo.src}
                loop
                muted
                autoPlay
                className="pointer-events-none h-full w-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                tabIndex={-1}
                controls={false}
              />
            </motion.div>

            {/* bottom right img */}
            <motion.div
              className="bg-placeholder -z-1 aspect-5/3 absolute right-0 top-[95%] w-[min(60vw,300px)] overflow-hidden rounded-md md:top-[75%] md:w-[max(264px,30vw)] md:rounded-lg lg:top-[66%] lg:w-[min(500px,25vw)]"
              initial={{ clipPath: "inset(0 0 100%  0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              <Image
                alt={HERO_GRAPHICS.bottomRightImg.alt}
                src={HERO_GRAPHICS.bottomRightImg.src}
                placeholder="blur"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/*  */}
      {/*  */}
      {/*  */}
      <section className="side-padding bg-beige mx-auto max-w-[2000px]">
        {/* headline  + video & img */}
        <div className="flex items-center justify-center">
          <div className="relative mt-[min(260px,50vw)] md:mt-[20vw] lg:mt-[min(250px,12.5vw)] lg:w-[min(100%,2000px)]">
            {/* headline */}
            <div>
              <h1 className="text-center text-[min(17.5vw,18vw)] font-semibold leading-[0.8] text-white mix-blend-difference md:text-[max(110px,12vw)] lg:text-[min(200px,10vw)]">
                <span className="inline-blockoverflow-hidden">
                  <span className="inline-blockwhitespace-pre">
                    {HOME_HERO_HEADLINE}{" "}
                  </span>
                </span>
                {/* {HOME_HERO_HEADLINE.split(" ").map((word, i) => {
          // let brCount = 0;
          if (word === "<br>") {
            // brCount++;
            return <br key={i} />;
          } else if (word === "<lg:br>") {
            // brCount++;
            return <br key={i} className="hidden lg:block" />;
          }
          return (
            <span key={i} className="inline-block overflow-hidden">
              <span className="inline-block whitespace-pre">{word} </span>
              <motion.span
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                delay: 0.5 + 0.075 * i - brCount,
                }}
                className="inline-block whitespace-pre mix-blend-difference z-1 relative"
                >
                {word}{" "}
                </motion.span>
            </span>
          );
        })} */}
              </h1>
            </div>

            {/* top left img */}
            <motion.div
              className="-z-1 md:aspect-3/4 absolute bottom-[85%] left-0 aspect-square w-[min(55vw,280px)] overflow-hidden rounded-md md:bottom-[45%] md:w-[max(220px,25vw)] md:rounded-lg lg:bottom-[25%] lg:w-[min(400px,20vw)]"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <Image
                src={HERO_GRAPHICS.topLeftImg.src}
                alt={HERO_GRAPHICS.topLeftImg.alt}
                placeholder="blur"
                className="h-full w-full object-cover"
              />
            </motion.div>

            {/* top left img */}
            <motion.div
              className="-z-1 md:aspect-3/4 absolute bottom-[85%] left-0 aspect-square w-[min(55vw,280px)] overflow-hidden rounded-md md:bottom-[45%] md:w-[max(220px,25vw)] md:rounded-lg lg:bottom-[25%] lg:w-[min(400px,20vw)]"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <video
                src={HERO_GRAPHICS.topLeftVideo.src}
                loop
                muted
                autoPlay
                className="pointer-events-none h-full w-full object-cover"
                onContextMenu={(e) => e.preventDefault()}
                tabIndex={-1}
                controls={false}
              />
            </motion.div>

            {/* bottom right img */}
            <motion.div
              className="bg-placeholder -z-1 aspect-5/3 absolute right-0 top-[95%] w-[min(60vw,300px)] overflow-hidden rounded-md md:top-[75%] md:w-[max(264px,30vw)] md:rounded-lg lg:top-[66%] lg:w-[min(500px,25vw)]"
              initial={{ clipPath: "inset(0 0 100%  0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }} //onmount reveal anim
              transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            >
              <Image
                alt={HERO_GRAPHICS.bottomRightImg.alt}
                src={HERO_GRAPHICS.bottomRightImg.src}
                placeholder="blur"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* rotating circular text + up next */}
        {/* <motion.div
          className="mt-[min(230px,50vw)] flex w-fit items-end gap-4 sm:gap-5 md:mt-[10vw] md:gap-6 lg:mt-[min(125px,6vw)]"
          initial={{ y: "50%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3, ease: "easeInOut" }}
        >
          <RotatingText />
        </motion.div> */}

        {/* subheadline - paragraph */}
        {/* <div className="sm:w-md md:w-lg lg:mt-50 xl:w-xl mt-40 w-[min(100%,390px)] text-lg sm:text-xl md:text-2xl xl:mt-60 xl:text-3xl">
          <p ref={subHeadlineRef}>
            {HOME_HERO_SUB_HEADLINE.split(" ").map((word, i) => {
              if (word === "<br>") {
                return <br key={i} />;
              }
              return (
                <span key={i} className="inline-block overflow-hidden">
                  <motion.span
                    className="inline-block whitespace-pre"
                    animate={{ y: isSubHeadlineInView ? 0 : "100%" }}
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
        </div> */}
      </section>
    </>
  );
}

// function RotatingText() {
//   return (
//     <div className="relative flex aspect-square w-[120px] shrink-0 items-center justify-center text-lg sm:w-[134px] sm:text-xl md:w-[160px] md:text-2xl">
//       {/* fixed text in the middle */}
//       <div className="absolute flex aspect-square w-[60px] items-center justify-center text-center font-light leading-[1] sm:w-[67px] md:w-[80px]">
//         <p>
//           {HOME_HERO_ROTATING_TEXT.sold_number}/
//           {HOME_HERO_ROTATING_TEXT.total_number} <br />
//           sold
//         </p>
//       </div>

//       {/* rotating text */}
//       <motion.div
//         className="absolute h-full w-full"
//         initial={{ rotate: 0 }}
//         animate={{ rotate: 360 }}
//         transition={{ ease: "linear", duration: 10, repeat: Infinity }}
//       >
//         <p>
//           {HOME_HERO_ROTATING_TEXT.text.split("").map((char, i) => (
//             <span
//               className="absolute left-1/2 inline-block w-3 origin-[0_60px] select-none text-center font-semibold uppercase sm:w-4 sm:origin-[0_67px] md:w-5 md:origin-[0_80px]"
//               key={i}
//               style={{
//                 transform: `rotate(${
//                   i * (360 / HOME_HERO_ROTATING_TEXT.text.length)
//                 }deg)`,
//               }}
//             >
//               <span style={{ rotate: "8deg", display: "inline-block" }}>
//                 {char}
//               </span>
//             </span>
//           ))}
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// function NextUp() {
//   return (
//     <div>
//       <p className="text-sm font-light opacity-80 md:text-base">next up :</p>
//       <div className="mt-1.5 flex flex-wrap gap-x-3 text-lg sm:text-xl md:text-2xl">
//         {HOME_HERO_NEXT_UP_ARTPIECES.includes("cirrus") && (
//           <p
//             className="flex text-white"
//             style={{ textShadow: "0 0 10px rgba(0,0,0,1)" }}
//           >
//             → CIRRUS
//           </p>
//         )}
//         {HOME_HERO_NEXT_UP_ARTPIECES.includes("axiom") && (
//           <p className="axiom-text flex">→ AXIOM</p>
//         )}
//       </div>
//     </div>
//   );
// }
