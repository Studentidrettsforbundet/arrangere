import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

export const inputFieldObjectState = atom({
  key: "inputFieldListState",
  default: {},
});

export const documentState = atom<string>({
  key: "documentState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("docID")],
});
