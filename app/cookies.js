import { createCookie } from "@remix-run/node";

export const userPrefs = createCookie("user-prefs", {
  maxAge: 604_800, // one week
  showBanner: true,
  ikari: "Ikari",
});

export let g2 = createCookie("g2-cookie", {
  caliente: "talvez",
  preparado: "denegado",
});
