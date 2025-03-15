"use client"
import { useState } from "react"
import AboutSection from "./AboutSection"
import HeroSection from "./HeroSection"
import ProcessSection from "./ProcessSection"
import TransitionSection from "./TransitionSection"
import CtaSection from "./CtaSection"
import ProgressBar from "@/components/Home/ProgressBar"

export default function HomePage() {
  const [bgColor, setBgColor] = useState("#f5f0ed")
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TransitionSection bgColor={bgColor} />
      <CtaSection bgColor={bgColor} setBgColor={setBgColor} />
      <ProcessSection />
      <ProgressBar />
    </>
  )
}
