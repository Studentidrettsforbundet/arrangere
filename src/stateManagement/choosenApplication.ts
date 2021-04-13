import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

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
  effects_UNSTABLE: [localStorageEffect("docID")],
});

export const currentCollectionState = atom<string>({
  key: "currentCollectionState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("collection")],
});

export const previousChapterState = atom<string>({
  key: "previousChapterState",
  default: "",
});
