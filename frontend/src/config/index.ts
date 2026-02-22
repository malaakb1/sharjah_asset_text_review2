/**
 * App-wide configuration constants.
 */

export const APP_CONFIG = {
  name: "Sharjah Assets",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
} as const;
