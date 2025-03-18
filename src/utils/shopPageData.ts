import { StaticImageData } from "next/image";

export type ShopItem = {
  title: string;
  totalStock: number;
  remainingStock: number;
  mainImg: StaticImageData;
  smallImg: StaticImageData;
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
  },
  {
    title: "Aurora Deer",
    totalStock: 7,
    remainingStock: 4,
    mainImg: ShopItem2MainImg,
    smallImg: ShopItem2SmallImg,
  },
];
