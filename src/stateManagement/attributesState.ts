import { selector } from "recoil";
import { atom, atomFamily } from "recoil";
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

// export const inputFieldSavedState = atom<boolean>({
//   key: "inputFieldSavedState",
//   default: false,
// });
