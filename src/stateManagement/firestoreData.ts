import { atom } from "recoil";
import firebase from "firebase/app";

export const NMdataState = atom<Object | null>({
  key: "NMdataState",
  default: null,
});
