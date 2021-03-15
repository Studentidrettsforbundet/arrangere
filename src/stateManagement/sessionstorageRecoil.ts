import { DefaultValue } from "recoil";

export const sessionStorageEffect = (key: string) => ({
  setSelf,
  onSet,
}: any) => {
  const savedValue = sessionStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue: any) => {
    if (newValue instanceof DefaultValue) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
