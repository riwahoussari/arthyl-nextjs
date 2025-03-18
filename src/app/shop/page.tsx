"use client";
import Button from "@/components/global/Button";
import PageTitle from "@/components/global/PageTitle";
import { SHOP_ITEMS, ShopItem } from "@/utils/shopPageData";
import useMousePosition from "@/utils/useMousePosition";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";
import PlaceholderImage from "../../../public/placeholderImage.jpg"

// Separate shop items into odd and even indexed groups
const ODD_ITEMS = SHOP_ITEMS.map((item, i) => {
  if ((i + 1) % 2 === 1) return item;
}).filter((item) => item !== undefined);
const EVEN_ITEMS = SHOP_ITEMS.map((item, i) => {
  if ((i + 1) % 2 === 0) return item;
}).filter((item) => item !== undefined);

export default function ShopPage() {
  // Track mouse position for small image hover effect
  const { x, y } = useMousePosition();
  const { scrollY } = useScroll();
  const [scrollYValue, setScrollYValue] = useState(0);
  useMotionValueEvent(scrollY, "change", () => {
    setScrollYValue(scrollY.get());
  });

  // Change the small image on card hover
  const [smImgSrc, setSmImgSrc] = useState<{
    src: StaticImageData | undefined;
    hovering: boolean;
  }>({ src: undefined, hovering: false });

  return (
    <>
      <PageTitle>Shop</PageTitle>

      {/* Cards Container */}

      <section className="side-padding mx-auto flex max-w-[2000px] flex-col items-stretch overflow-hidden md:flex-row md:items-start md:justify-around md:gap-5">
        {/* left column: odd */}
        <div>
          {ODD_ITEMS.map((item, i) => (
            <div
              key={i}
              className="mb-24 md:mb-0 md:h-[67.5vw] md:max-h-[1200px] md:min-h-[600px]"
            >
              <Card {...item} setSmImgSrc={setSmImgSrc} />
            </div>
          ))}
        </div>

        {/* right column: even */}
        <div>
          <div className="md:h-[32vw] md:max-h-[70vh] md:w-1" /> {/* spacer */}
          {EVEN_ITEMS.map((item, i) => (
            <div
              key={i}
              className="mb-24 md:mb-0 md:h-[67.5vw] md:max-h-[1200px] md:min-h-[600px]"
            >
              <Card {...item} setSmImgSrc={setSmImgSrc} />
            </div>
          ))}
        </div>

        {/* small floating image that follows cursor on hover */}
        <motion.div
          className="translate-[24px] absolute z-10 aspect-square w-[10vw] min-w-[200px] origin-top-left overflow-hidden rounded-md opacity-0 shadow-2xl shadow-black/50 lg:opacity-100"
          animate={{
            top: (y || 0) + scrollYValue,
            left: x || 0,
            scale: smImgSrc.hovering ? 1 : 0,
          }}
          transition={{
            top: { type: "tween", ease: "backOut", duration: 0.5 },
            bottom: { type: "tween", ease: "backOut", duration: 0.5 },
            scale: { type: "tween", ease: "easeInOut", duration: 0.3 },
          }}
        >
          <Image
            aria-hidden
            src={smImgSrc.src || PlaceholderImage}
            placeholder={smImgSrc.src ? "blur" : undefined}
            className="aspect-square w-full object-cover object-center"
            width={200}
            height={200}
            alt=""
          />
        </motion.div>
      </section>
    </>
  );
}

function Card({
  title,
  totalStock,
  remainingStock,
  mainImg,
  smallImg,
  setSmImgSrc,
}: ShopItem & {
  setSmImgSrc: React.Dispatch<
    React.SetStateAction<{
      src: StaticImageData | undefined;
      hovering: boolean;
    }>
  >;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true });

  // update small image source on hover
  function onEnter() {
    setSmImgSrc({ src: smallImg, hovering: true });
  }
  function onLeave() {
    setSmImgSrc((prev) => ({ ...prev, hovering: false }));
  }
  return (
    <div
      ref={cardRef}
      className="group relative mx-auto w-full max-w-[400px] cursor-pointer space-y-3 md:mx-0 md:w-[45vw] md:max-w-[800px]"
    >
      {/* Product Image with Reveal Animation */}
      <motion.div
        initial={{ clipPath: "inset(25% 25% 25% 25% )" }}
        animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="bg-placeholder aspect-square w-full max-w-[400px] overflow-hidden rounded-xl md:w-[45vw] md:max-w-[800px]"
      >
        <Image
          src={mainImg}
          placeholder="blur"
          alt={`Photo of ${title} artpiece.`}
          className="h-full w-full object-cover duration-200 ease-in-out group-hover:scale-110"
        />
      </motion.div>

      {/* Product Info and CTA Button */}
      <div className="flex flex-col items-start gap-2 xl:flex-row xl:items-end xl:justify-between xl:gap-6">
        <div>
          <p className="text-xl font-medium md:text-2xl lg:text-3xl">{title}</p>
          <p className="text-sm opacity-70 md:text-base lg:text-lg">
            {remainingStock}/{totalStock} Remaining
          </p>
        </div>
        <div className="shrink-0 xl:w-[272px]">
          <Button arrow={true} size="lg">
            Artify Your Space
          </Button>
        </div>
      </div>
    </div>
  );
}
