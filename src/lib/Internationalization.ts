import { store } from "./Store";
import textMapJSONALL from "../assets/textMap.json";

export const numDecimals = 2;
// en-US = . (dot)
// bg-BG = , (comma)
// export const formatter = new Intl.NumberFormat(locale, {
//   maximumFractionDigits: numDecimals,
// });

export function UpdateActiveLangMap(activeLang: string) {
  store.update((s) => {
    s.activeLang = activeLang;
    s.textMap = textMapJSONALL[activeLang];
    return s;
  });
}
