import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center gap-1 justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 ",
);

export const thumbnails: string[] = [
  "/assets/thumbnails/pukla-design-1.png",
  "/assets/thumbnails/pukla-design-2.png",
  "/assets/thumbnails/pukla-design-3.png",
  "/assets/thumbnails/pukla-design-4.png",
  "/assets/thumbnails/pukla-design-5.png",
  "/assets/thumbnails/pukla-design-6.png",
  "/assets/thumbnails/pukla-design-7.png",
];
export const appIcons2 = [
  { name: "hungerstation", size: "square" },
  { name: "jahez", size: "square" },
  { name: "tiktok", size: "square" },
  { name: "mrsool", size: "square" },
  { name: "phone", size: "square" },
];
export const appIcons1 = [
  { name: "carriage", size: "square" },
  { name: "to-you", size: "rect" },
  { name: "talabat", size: "square" },
  { name: "telegram", size: "square" },
  { name: "linkedin", size: "square" },
];
export const appIcons3 = [
  { name: "discord", size: "square" },
  { name: "facebook", size: "square" },
  { name: "threads", size: "square" },
  { name: "wssel", size: "rect" },
  { name: "x", size: "square" },
];
export const appIcons4 = [
  { name: "snapchat", size: "square" },
  { name: "instagram", size: "square" },
  { name: "twitch", size: "square" },
  { name: "mail", size: "square" },
  { name: "whatsapp", size: "square" },
];

export const plan1Price: any = {
  usd: { monthly: 9.99, annually: 9.99 * 12 },
  sar: { monthly: 37.46, annually: 37.46 * 12 },
};
export const plan2Price: any = {
  usd: { monthly: 5, annually: 4 * 12 },
  sar: { monthly: 18.75, annually: 15 * 12 },
};
export const plan3Price: any = {
  usd: { monthly: 9, annually: 7.5 * 12 },
  sar: { monthly: 33.75, annually: 28.13 * 12 },
};

/**
 * Converts a hex color to RGB values
 */
const hexToRGB = (hex: string) => {
  // Remove the hash if present
  hex = hex.replace("#", "");

  // Handle both short and long hex formats
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
  const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
  const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);

  return { r, g, b };
};

/**
 * Calculates relative luminance using the WCAG formula
 * Returns a value between 0 (darkest) and 1 (lightest)
 */
const calculateLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Determines whether to use light or dark logo based on background color
 * @param backgroundColor - Hex color code (with or without #)
 * @returns boolean - true for light logo, false for dark logo
 */
export const shouldUseLightContent = (backgroundColor: string): boolean => {
  if (!backgroundColor) return true;

  try {
    const rgb = hexToRGB(backgroundColor);
    const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b);

    // Use light logo if background is dark (luminance < 0.5)
    return luminance < 0.5;
  } catch (error) {
    console.error("Error processing background color:", error);
    return true; // Default to light logo on error
  }
};
