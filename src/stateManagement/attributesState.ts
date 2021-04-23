import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";

export const inputFieldObjectState = atom({
  key: "inputFieldListState",
  default: {},
});

export const applicationIDState = atom<string>({
  key: "applicationIDState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("docID")],
});
