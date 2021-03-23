import { atom } from "recoil";
import firebase from "firebase/app";
import { sessionStorageEffect } from "./sessionstorageRecoil";

export const currentUserState = atom<firebase.User | null>({
  key: "currentUserState",
  default: null,
});

export const loadingUserState = atom<boolean>({
  key: "loadingUserState",
  default: true,
});

export const userRoleState = atom<string>({
  key: "userRoleState",
  default: "",
});
