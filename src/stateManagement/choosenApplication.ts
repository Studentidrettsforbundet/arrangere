import { atom } from "recoil";
import { localStorageEffect } from "./userAuth";

export const choosenApplicationState = atom<string>({
  key: "applicationState",
  default: "snmTemplate",
  effects_UNSTABLE: [localStorageEffect("choosen_application")],
});
