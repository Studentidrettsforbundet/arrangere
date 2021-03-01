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


export enum ErrorStatus {
  PASSWORD = "password",
  EMAIL = "email",
  OTHER = "other",
  NONE = "",
}

export enum ErrorText {
  NOT_MATCH = "Passordene er ikke like",
  REQUIRED = "Fyll inn alle feltene",
  WRONG_EMAIL = "Ugyldig e-postadresse",
  EMAIL_IN_USE = "En bruker er allerede knyttet til denne adressen",
  GENERAL = "Konto ble ikke opprettet",
  WEAK_PASSWORD = "Passordet må bestå av minst seks bokstaver eller tegn",
  LOGIN = "E-post eller passord er feil",
  NONE = "",
}

type ErrorTypes = {
  status: ErrorStatus;
  text: ErrorText;
}
export const errorState = atom<ErrorTypes>({
  key: "errorState",
  default: {
    status: ErrorStatus.NONE,
    text: ErrorText.NONE,
  }
});


