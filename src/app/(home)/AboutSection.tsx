import Button from "@/components/global/Button";
import Link from "next/link";

export default function AboutSection() {
    return (
      <section className="side-padding mx-auto my-50 w-full max-w-[2000px] lg:my-60 xl:my-70">
        <div className="relative flex flex-col gap-4">
          <p className="bg-white bg-clip-text text-[12vw] leading-[1] font-semibold text-transparent uppercase mix-blend-difference lg:text-[min(200px,10vw)]">
            meet arthyl
          </p>
          <div className="aspect-5/6 w-[min(360px,80%)] self-end overflow-hidden md:absolute md:top-1/2 md:-z-1 md:w-[min(700px,42%)] md:-translate-y-1/2">
            <img
              src="Arthyl-Ahmad.webp"
              className="-translate-y-1/5 scale-110"
              alt=""
            />
          </div>
          <p className="w-[95%] opacity-70 sm:text-lg md:w-[53%] lg:text-2xl lg:leading-[1.4] xl:text-3xl">
            I am not your typical artist. I didn’t grow up surrounded by art, nor
            did I inherit a creative legacy. My journey was different—shaped by an
            entrepreneurial mindset and a deep passion for business. I’ve always
            been fascinated by the concepts of growth, perseverance, and the
            challenges that shape success. This passion eventually led me to
            discover art, not as a traditional practice but as a medium to express
            the core values of ambition and achievement.
          </p>
          <Link
            href="/about"
            className="mt-2 w-max origin-center scale-120 md:mt-8 lg:mt-10 xl:mt-12"
          >
            <Button secondary={true} arrow={true} size="lg">
              Read More
            </Button>
          </Link>
        </div>
      </section>
    );
  }