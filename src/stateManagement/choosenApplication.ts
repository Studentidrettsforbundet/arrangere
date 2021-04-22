import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

export const choosenApplicationState = atom<string>({
  key: "applicationState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("collection")],
});

export const currentChapterState = atom<string>({
  key: "currentChapterState",
  default: "",
});

export const chapterCounterState = atom<number>({
  key: "chapterCounterState",
  default: 0,
});

// Alle plasser der disse er brukt må omformuleres til å bruke gammel state
export const currentApplicationIdState = atom<string>({
  key: "currentApplicationIdState",
  default: "",
});

export const previousChapterState = atom<string>({
  key: "previousChapterState",
  default: "",
});
