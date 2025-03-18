// HOMEPAGE - hero section
import HeroTopLeftImg from "../../public/winged-horse-hero.jpg";
import HeroBottomLeftImg from "../../public/winged-horse-hero.jpg";
export const HERO_GRAPHICS = {
  topLeftVideo: {
    src: "/hero-top-left-video.mp4",
    alt: "video of Obsidian Winged Horse",
  },
  topLeftImg: {
    src: HeroTopLeftImg,
    alt: "",
  },
  bottomRightImg: {
    src: HeroBottomLeftImg,
    alt: "",
  },
};

// HOMEPAGE - about arthyl section
import HomeAboutSectionImg from "../../public/home-about-section-img.webp";
import { StaticImageData } from "next/image";
export const HOME_ABOUT_SECTION_IMG = {
  src: HomeAboutSectionImg,
  alt: "Image of the artist named Arthyl",
};

// HOMEPAGE - horizontal scroll section
type HrztlSrclImg =
  | {
      special: false;
      src: StaticImageData;
      width: "lg" | "sm";
      alt: string;
    }
  | {
      special: true;
      front: StaticImageData;
      back: StaticImageData;
      horse: StaticImageData;
    };
import HomeHrztlScrlImg1 from "../../public/home-hrztl-srcl-img-1.jpg";
import HomeHrztlScrlImg2 from "../../public/home-hrztl-srcl-img-2.jpg";
import HomeHrztlScrlImg3 from "../../public/home-hrztl-srcl-img-3.jpg";
import HomeHrztlScrlImg4 from "../../public/home-hrztl-srcl-img-4.jpg";
import HomeHrztlScrlHorseImg from "../../public/home-hrztl-srcl-horse-img.png";
import HomeHrztlScrlMuseumFront from "../../public/home-hrztl-srcl-museum-front.png";
import HomeHrztlScrlMuseumBack from "../../public/home-hrztl-srcl-museum-back.jpg";
export const HOME_HORIZONTAL_SCROLL_IMAGES: HrztlSrclImg[] = [
  {
    special: false,
    src: HomeHrztlScrlImg1,
    width: "lg",
    alt: "img of obsidian winged horse in a room.",
  },
  {
    special: false,
    src: HomeHrztlScrlImg2,
    width: "sm",
    alt: "img of obsidian winged horse in a room.",
  },
  {
    special: false,
    src: HomeHrztlScrlImg3,
    width: "sm",
    alt: "img of obsidian winged horse in a room.",
  },
  {
    special: true,
    front: HomeHrztlScrlMuseumFront,
    back: HomeHrztlScrlMuseumBack,
    horse: HomeHrztlScrlHorseImg,
  },
  {
    special: false,
    src: HomeHrztlScrlImg4,
    width: "sm",
    alt: "img of obsidian winged horse in a room.",
  },
];

// HOMEPAGE - horse info section
import HomeHorseSectionHorseWings from "../../public/horse-wings.png";
import HomeHorseSectionHorseBody from "../../public/horse-body.png";
export const HOME_HORSE_SECTION_IMAGES = {
  horseWings: HomeHorseSectionHorseWings,
  horseBody: HomeHorseSectionHorseBody,
};

// HOMEPAGE - the process section
 type ProcessImg = {
  text: string;
  alt: string;
  img: StaticImageData
}
import HomeProcessSectionStep1Img from "../../public/home-process-section-step-1.png"
import HomeProcessSectionStep2Img from "../../public/home-process-section-step-2.png"
import HomeProcessSectionStep3Img from "../../public/home-process-section-step-3.webp"
export const HOME_PROCESS_SECTION_STEPS: ProcessImg[] = [
  {
    text: "This is some text explaining step 1. This is some text explaining step 1.",
    img: HomeProcessSectionStep1Img,
    alt: ""
  },
  {
    text: "This is some text explaining step 2.",
    img: HomeProcessSectionStep2Img,
    alt: "",
  },
  {
    text: "This is some text explaining step 3. This is some text explaining step 3. This is some text explaining step 3.",
    img: HomeProcessSectionStep3Img,
    alt: ""
  }
];


// ABOUT PAGE - about arthyl section
import AboutPageImg from "../../public/about-page-img.webp";
export const ABOUT_PAGE_IMG = {
  src: AboutPageImg,
  alt: "Image of the artist named Arthyl",
};
