import { store } from "./Store";
import textMapJSONALL from "../assets/textMap.json";

export function UpdateActiveLangMap(activeLang: string) {
  store.update((s) => {
    s.activeLang = activeLang;
    s.textMap = textMapJSONALL[activeLang];
    return s;
  });
}
