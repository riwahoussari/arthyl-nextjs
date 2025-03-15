"use client"
import Button from "@/components/global/Button"
import PageTitle from "@/components/global/PageTitle"
import { SHOP_ITEMS, ShopItem } from "@/utils/constants"
import useMousePosition from "@/utils/useMousePosition"
import { motion, useInView, useMotionValueEvent, useScroll } from "motion/react"
import { useRef, useState } from "react"

const ODD_ITEMS = SHOP_ITEMS.map((item, i) => {
  if ((i + 1) % 2 === 1) return item
}).filter((item) => item !== undefined)
const EVEN_ITEMS = SHOP_ITEMS.map((item, i) => {
  if ((i + 1) % 2 === 0) return item
}).filter((item) => item !== undefined)

export default function ShopPage() {
  return (
    <>
      <Layout2 />
    </>
  )
}

function Layout2() {
  const { x, y } = useMousePosition()
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)
  const [smImgSrc, setSmImgSrc] = useState<{
    src: string | undefined
    hovering: boolean
  }>({ src: undefined, hovering: false })

  useMotionValueEvent(scrollY, "change", () => {
    setScrollYValue(scrollY.get())
  })

  return (
    <>
      <PageTitle>Shop</PageTitle>

      {/* Cards Container */}

      <section className="side-padding mx-auto flex max-w-[2000px] flex-col items-stretch overflow-hidden md:flex-row md:items-start md:justify-around md:gap-5">
        {/* column 1 */}
        <div>
          {ODD_ITEMS.map((item, i) => (
            <div
              key={i}
              className="mb-24 md:mb-0 md:h-[67.5vw] md:max-h-[1200px] md:min-h-[600px]"
            >
              <Card2
                imageSrcUrl={item.imageSrcUrl}
                secondImageSrcUrl={item.secondImageSrcUrl}
                title={item.title}
                remainingStock={item.remainingStock}
                totalStock={item.totalStock}
                setSmImgSrc={setSmImgSrc}
              />
            </div>
          ))}
        </div>

        {/* column 2 */}
        <div>
          <div className="md:h-[32vw] md:max-h-[70vh] md:w-1">
            {/* spacer */}
          </div>

          {EVEN_ITEMS.map((item, i) => (
            <div
              key={i}
              className="mb-24 md:mb-0 md:h-[67.5vw] md:max-h-[1200px] md:min-h-[600px]"
            >
              <Card2
                imageSrcUrl={item.imageSrcUrl}
                secondImageSrcUrl={item.secondImageSrcUrl}
                title={item.title}
                remainingStock={item.remainingStock}
                totalStock={item.totalStock}
                setSmImgSrc={setSmImgSrc}
              />
            </div>
          ))}
        </div>
        {/* small image that follows cursor on hover */}
        <motion.div
          className="absolute z-10 aspect-square w-[10vw] min-w-[200px] origin-top-left translate-[24px] overflow-hidden rounded-md opacity-0 shadow-2xl shadow-black/50 lg:opacity-100"
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
          <img
            src={smImgSrc.src}
            className="aspect-square w-full object-cover object-center"
            alt=""
          />
        </motion.div>
      </section>
    </>
  )
}

function Card2({
  title,
  totalStock,
  remainingStock,
  imageSrcUrl,
  secondImageSrcUrl,
  setSmImgSrc,
}: ShopItem & {
  setSmImgSrc: React.Dispatch<
    React.SetStateAction<{
      src: string | undefined
      hovering: boolean
    }>
  >
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true })
  function onEnter() {
    setSmImgSrc({ src: secondImageSrcUrl, hovering: true })
  }
  function onLeave() {
    setSmImgSrc((prev) => ({ ...prev, hovering: false }))
  }
  return (
    <div
      ref={cardRef}
      className="group relative mx-auto w-full max-w-[400px] cursor-pointer space-y-3 md:mx-0 md:w-[45vw] md:max-w-[800px]"
    >
      <motion.div
        initial={{ clipPath: "inset(25% 25% 25% 25% )" }}
        animate={isInView ? { clipPath: "inset(0 0 0 0)" } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="bg-placeholder aspect-square w-full max-w-[400px] overflow-hidden rounded-xl md:w-[45vw] md:max-w-[800px]"
      >
        <img
          src={imageSrcUrl || undefined}
          alt={`Photo of ${title} artpiece.`}
          className="h-full w-full object-cover duration-200 ease-in-out group-hover:scale-110"
        />
      </motion.div>

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
  )
}
