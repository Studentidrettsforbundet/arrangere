import { atom } from "recoil";
import { localStorageEffect } from "./localstorageRecoil";


export const choosenApplicationState = atom<string>({
  key: "applicationState",
  default: "snm",
  effects_UNSTABLE: [localStorageEffect("template")],
  
});
