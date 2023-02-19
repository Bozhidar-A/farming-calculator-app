import { store } from "./Store";
import textMapJSONALL from "../assets/textMap.json";

export function FormatNumberInternationalization(
  num: number,
  numDecimals: number
) {
  // en-US = . (dot)
  // bg-BG = , (comma)
  // hard coding en-US for now, as this has turned out to be a very big can of worms
  // and this is what browser and input type=number is by default

  // concept: NumberFormat supports and will work with any locale
  // allow the user to pick their locale?
  // how will this work the inputs? the only way to get them to localize properly is to use hacky workarounds
  const formatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: numDecimals,
  });
  return formatter.format(num);
}

// this formats the numbers using math
// for some reason when using 33816.42512077295 and setting numDecimals to 0
// FormatNumberInternationalization returns 33,816 instead of 33816
// maybe I am misunderstanding how to use this
export function FormatNumber(num: number, numDecimals: number) {
  return num.toFixed(numDecimals);
}

export function UpdateActiveLangMap(activeLang: string) {
  store.update((s) => {
    s.activeLang = activeLang;
    s.textMap = textMapJSONALL[activeLang];
    return s;
  });
}
