import { useScroll, useTransform, motion } from "motion/react"
import { useRef } from "react"

export default function PageTitle({ children }: { children: string }) {
  const divRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: divRef,
    offset: ["start start", "end start"],
  })
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 150])

  return (
    <motion.div
      ref={divRef}
      style={{ y: parallax }}
      className="flex h-80 items-center justify-center sm:h-[400px] relative z-0 bg-beige"
    >
      {/* Decorative curve */}
      <motion.div
        className="absolute top-0 left-0 -translate-1/2 z-0 h-160 w-full min-w-[600px]  rounded-[100%] border-1  lg:aspect-3/2 lg:[height:unset] lg:max-h-[1200px] lg:min-h-[800px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {/* page title with animated letters */}
      <div className="overflow-hidden">
        <h1 className="lg:text-9x text-5xl font-semibold text-white mix-blend-difference sm:text-8xl relative z-1">
          {children
            .toUpperCase()
            .split("")
            .map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block whitespace-pre"
                initial={{ y: i % 2 ? "100%" : "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
              >
                {letter}
              </motion.span>
            ))}
        </h1>
      </div>
    </motion.div>
  )
}
