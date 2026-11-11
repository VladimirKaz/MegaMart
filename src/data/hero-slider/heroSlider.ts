// src/data/heroSlides.ts

import watchImage from "@/assets/images/sections/hero/hero-watch.png";

export interface HeroSlide {
  id: number | string;
  kicker: string;    // Мелкий текст сверху
  title: string;     // Главный заголовок
  subtitle: string;  // Текст с описанием (акция)
  image: any;        // Картинка товара
  alt: string;       // Alt для картинки
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    kicker: "Best Deal Online on smart watches",
    title: "SMART WEARABLE.",
    subtitle: "UP to 80% OFF",
    image: watchImage,
    alt: "Смарт-часы",
  },
  {
    id: 2,
    kicker: "Top Sound Quality",
    title: "WIRELESS AUDIO.",
    subtitle: "UP to 50% OFF",
    image: watchImage,
    alt: "Наушники",
  },
];