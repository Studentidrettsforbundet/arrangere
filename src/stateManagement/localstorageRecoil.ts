import { DefaultValue } from "recoil";

export const localStorageEffect = (key: string) => ({
  setSelf,
  onSet,
}: any) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null && savedValue != undefined) {
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
