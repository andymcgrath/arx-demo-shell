/**
 * BRANDING CONFIGURATION
 *
 * There are two distinct branding layers:
 *
 *   MANUFACTURER — displayed only in the Header and Footer
 *                  (platform name, logo, tagline, support, legal)
 *
 *   PROGRAM      — displayed throughout the workflow pages
 *                  (drug name, drug logo, description, brand colors)
 *
 * To rebrand say "rebrand [Program Name]" and the assistant will prompt
 * you for all the info below and update this file + global.css automatically.
 *
 * Logo variants:
 *   colors — transparent background, brand-colored (use on white/light bg)
 *   white  — transparent background, all white    (use on teal/dark bg)
 */

export const MANUFACTURER = {
  name: "Boehringer Ingelheim",
  tagline: "Patient assistance & medication access program",
  logo: {
    colors: "https://cdn.builder.io/api/v1/image/assets%2F4c828a6b97e546bc967a796675ca457e%2Fc247a0ae707a47099e0b22c5536915bd",
    requiresFilter: false,
    white: "/uploads/1778645911615-imgi-5-boehringer-ingelheim-logo.png",
  },
  support: {
    label: "Technical Help",
    phone: "877-450-4412",
  },
  legal: {
    privacyUrl: "#",
    termsUrl: "#",
    safetyUrl: "#",
    prescribingUrl: "#",
  },
  copyright: "©2026 Boehringer Ingelheim. All Rights Reserved. Intended for US residents only.",
};

export const PROGRAM = {
  name: "Jascayd",
  drugDisplayName: "JASCAYD (nerandomilast)",
  description: "18 mg · 30-day supply",
  logo: {
    // Transparent background, brand-colored — use on white/light backgrounds
    colors: "/uploads/1778646057594-imgi-1-jascayd-logo-link-to-homepage.png",
    // Transparent background, all white — use on teal/dark backgrounds
    white: "/uploads/1778647226709-jascayd-logo-white.svg",
  },
  colors: {
    // Applied to --arx-primary, --arx-primary-dark, --arx-primary-80 in global.css
    primary: "#215048",
    primaryDark: "#08312a",
    primaryLight: "#22e37c",
  },
};

export const CHATBOT_ICON = "https://cdn.builder.io/api/v1/image/assets%2F4c828a6b97e546bc967a796675ca457e%2Fcd6e286159a142f4ba939dc20997b2da";
