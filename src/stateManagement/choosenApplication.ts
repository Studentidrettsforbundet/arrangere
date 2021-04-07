import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

export const choosenApplicationState = atom<string>({
  key: "applicationState",
  default: "snm",
  effects_UNSTABLE: [localStorageEffect("template")],
});

export const currentChapterState = atom<string>({
  key: "currentChapterState",
  default: "",
});

export const chapterCounterState = atom<number>({
  key: "chapterCounterState",
  default: 0,
});

export const currentApplicationIdState = atom<string>({
  key: "currentApplicationIdState",
  default: "",
})

export const currentCollectionState = atom<string>({
  key: "currentCollectionState",
  default: "",
})
