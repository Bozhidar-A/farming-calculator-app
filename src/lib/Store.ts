import { writable } from "svelte/store";
import textMapJSONALL from "../assets/textMap.json";

export const store = writable({
  activeLang: "EN", // default to english
  textMap: textMapJSONALL["EN"],
});
