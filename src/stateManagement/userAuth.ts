import { atom } from "recoil";
import firebase from "firebase/app";
import { sessionStorageEffect } from "./sessionstorageRecoil";

export const currentUserState = atom<firebase.User | null>({
  key: "currentUserState",
  default: null,
  effects_UNSTABLE: [sessionStorageEffect("current_user")],
});
