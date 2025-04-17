"use client";
// import { useState } from "react";
// import AboutSection from "./AboutSection";
// import HeroSection from "./HeroSection";
// import ProcessSection from "./ProcessSection";
// import TransitionSection from "./TransitionSection";
// import CtaSection from "./CtaSection";
// import ProgressBar from "@/components/Home/ProgressBar";

export default function HomePage() {
  // const [bgColor, setBgColor] = useState("#f5f0ed");
  return (
    <>
      <section>
        <div className="flex-center">
          <div className="container">
            <div>
              <h1>
                <span className="inline-block overflow-hidden">
                  <span className="inline-block whitespace-pre">PAGE</span>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* <HeroSection />
      <AboutSection />
      <TransitionSection bgColor={bgColor} />
      <CtaSection bgColor={bgColor} setBgColor={setBgColor} />
      <ProcessSection />
      <ProgressBar /> */}
    </>
  );
}
