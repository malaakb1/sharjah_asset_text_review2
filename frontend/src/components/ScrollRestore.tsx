"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

/**
 * Prevents scroll-to-top when locale changes.
 * Captures scrollY before the locale switch takes effect,
 * then forcefully restores it after React commits the DOM update.
 */
export default function ScrollRestore() {
  const locale = useLocale();
  const prevLocale = useRef(locale);
  const savedScroll = useRef<number | null>(null);

  // When locale is about to change, the component re-renders.
  // On that render, if locale changed, restore saved scroll.
  useEffect(() => {
    if (prevLocale.current !== locale && savedScroll.current !== null) {
      const y = savedScroll.current;
      savedScroll.current = null;
      const html = document.documentElement;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, y);
      // Also restore after a short delay for any lazy-loaded content
      const t1 = setTimeout(() => window.scrollTo(0, y), 50);
      const t2 = setTimeout(() => {
        window.scrollTo(0, y);
        html.style.scrollBehavior = "";
      }, 150);
      prevLocale.current = locale;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
    prevLocale.current = locale;
  }, [locale]);

  // Expose a way for the Header to save scroll before navigating
  useEffect(() => {
    const handler = () => {
      savedScroll.current = window.scrollY;
    };
    window.addEventListener("__save_scroll", handler);
    return () => window.removeEventListener("__save_scroll", handler);
  }, []);

  return null;
}
