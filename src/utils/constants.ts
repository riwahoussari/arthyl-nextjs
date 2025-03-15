export const PAGES = [
  { name: "home", link: "/" },
  { name: "about", link: "/about" },
  { name: "contact", link: "/contact" },
  { name: "shop", link: "/shop" },
]

export const SOCIALS_LINKS = [
  { platform: "instagram", url: "https://instagram.com/iamarthyl" },
  { platform: "facebook", url: "https://instagram.com/iamarthyl" },
]

export const EASE_IN_OUT_CUBIC = [0.65, 0, 0.35, 1]

export type ShopItem = {
  title: string
  totalStock: number
  remainingStock: number
  imageSrcUrl: string
  secondImageSrcUrl: string
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    title: "Obsidian - Winged Horse",
    totalStock: 10,
    remainingStock: 9,
    imageSrcUrl: "/Obsidian-Horse.webp",
    secondImageSrcUrl: "/horse-dark-room.jpg",
  },
  {
    title: "Aurora Deer",
    totalStock: 7,
    remainingStock: 4,
    imageSrcUrl: "/deer-cropped.jpg",
    secondImageSrcUrl: "/deer-cropped.jpg",
  },
  // {
  //   title: "Another Art Piece",
  //   totalStock: 7,
  //   remainingStock: 4,
  //   imageSrcUrl: "/nothing.jpg",
  //   secondImageSrcUrl: "/nothing.jpg",
  // },
]

export type Coordinates = { x: number; y: number }

export const ABOUT_ME_PARAGRAPHS = [
  {
    title: "Who Am I?",
    text: "I am not your typical artist. I didn’t grow up surrounded by art, nor did I inherit a creative legacy. My journey was different—shaped by an entrepreneurial mindset and a deep passion for business. I’ve always been fascinated by the concepts of growth, perseverance, and the challenges that shape success.",
  },
  {
    title: "Why Art?",
    text: "This passion for business eventually led me to discover art—not as a traditional practice but as a way to express the core values of ambition and achievement. For me, art is more than colors or forms; it’s a visual language of resilience, triumph, and innovation.",
  },
  {
    title: "Who Is My Art For?",
    text: "Every piece I create is a reflection of the entrepreneurial journey, designed to inspire business owners, dreamers, and leaders who strive to overcome obstacles and build their visions. My work isn’t just about aesthetics; it’s about crafting stories that resonate with those who see success as a blend of hard work, creativity, and determination.",
  },
  {
    title: "What Is My Mission?",
    text: "Through my art, I aim to bridge the worlds of creativity and business, offering a perspective that celebrates ambition and the beauty of challenges. My work is a signature of growth, meant to inspire those who see themselves not just as spectators, but as achievers.",
  },
]

// home page
// hero
export const ROTATING_TEXT = {
  // text: "--------------------------------",
  text: "obsidian - obsidian - ",
  sold_number: 1,
  total_number: 10,
}

export const HORIZONTAL_SCROLL_IMAGES = [
  { special: false, src: "room1.jpg", width: "lg" },
  { special: false, src: "room2.jpg", width: "sm" },
  { special: false, src: "room3.jpg", width: "sm" },
  {
    special: true,
    front: "museum-front.png",
    back: "museum-back.jpg",
    horse: "horse-nobg.png",
  },
  { special: false, src: "room5.jpg", width: "sm" },
]
