import { atom, DefaultValue } from "recoil";
import firebase from "firebase/app";

export const localStorageEffect = (key: string) => ({
  setSelf,
  onSet,
}: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue: any) => {
    if (newValue instanceof DefaultValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export const currentUserState = atom<firebase.User | null>({
  key: "currentUserState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("current_user")],
});
