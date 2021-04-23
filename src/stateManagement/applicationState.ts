import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

export const applicationTypeState = atom<string>({
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
