import { StaticImageData } from "next/image";

export type ShopItem = {
  title: string;
  totalStock: number;
  remainingStock: number;
  mainImg: StaticImageData;
  smallImg: StaticImageData;
  features: string[];
  sizes: CanvasSize[];
};
type CanvasSize = {
  name: string;
  width: number;
  height: number;
  depth: number;
};

import ShopItem1MainImg from "../../public/shop-item-1-main-img.webp";
import ShopItem1SmallImg from "../../public/shop-item-1-small-img.jpg";

import ShopItem2MainImg from "../../public/shop-item-2-main-img.jpg";
import ShopItem2SmallImg from "../../public/shop-item-2-small-img.jpg";
export const SHOP_ITEMS: ShopItem[] = [
  {
    title: "Obsidian - Winged Horse",
    totalStock: 10,
    remainingStock: 9,
    mainImg: ShopItem1MainImg,
    smallImg: ShopItem1SmallImg,
    features: [
      "Plexiglass Wall Art",
      "Signed",
      "Includes a Certificate of Authenticity and Story behind the art",
      "Supplied with a specialized art transportation crate",
      "Worldwide shipping",
    ],
    sizes: [{name: "Large Canvas", width: 100, height: 88, depth: 5}],
  },
  {
    title: "Aurora Deer",
    totalStock: 7,
    remainingStock: 4,
    mainImg: ShopItem2MainImg,
    smallImg: ShopItem2SmallImg,
    features: [
      "Plexiglass Wall Art",
      "Signed",
      "Includes a Certificate of Authenticity and Story behind the art",
      "Supplied with a specialized art transportation crate",
      "Worldwide shipping",
    ],
    sizes: [{name: "Small Canvas", width: 50, height: 44, depth: 5}, {name: "Large Canvas", width: 100, height: 88, depth: 5}],
  },
];
