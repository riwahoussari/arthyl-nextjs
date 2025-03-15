"use client"
import { useScroll, useTransform, motion } from "motion/react"

export default function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  return (
    <motion.div
      style={{ width }}
      className="fixed bottom-0 z-10 h-2 w-full bg-beige mix-blend-difference"
    />
  )
}
