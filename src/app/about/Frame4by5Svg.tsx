import { MotionValue, useTransform, motion } from "motion/react"
import { SVGProps } from "react"

export default function Frame4by5({
  progress,
  ...props
}: { progress: MotionValue<number> } & SVGProps<SVGSVGElement>) {
  const path1Progress = useTransform(progress, [0, 0.25], [0, 1])
  const path2Progress = useTransform(progress, [0.25, 0.5], [0, 1])
  const path3Progress = useTransform(progress, [0.5, 0.75], [0, 1])
  const path4Progress = useTransform(progress, [0.75, 1], [0, 1])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 500"
      fill="none"
      {...props}
    >
      <motion.path
        d="M1 1H400"
        stroke="black"
        initial={{ pathLength: 0 }}
        style={{ pathLength: path1Progress }}
      />
      <motion.path
        d="M399.5 0.5V500"
        stroke="black"
        initial={{ pathLength: 0 }}
        style={{ pathLength: path2Progress }}
      />
      <motion.path
        d="M400 499.5H1"
        stroke="black"
        initial={{ pathLength: 0 }}
        style={{ pathLength: path3Progress }}
      />
      <motion.path
        d="M1 0.5V500"
        stroke="black"
        initial={{ pathLength: 0 }}
        style={{ pathLength: path4Progress, rotate: 180 }}
      />
    </svg>
  )
}
