import { atom, selector } from "recoil";

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
  GENERAL = "Noe gikk galt",
  WEAK_PASSWORD = "Passordet må bestå av minst seks bokstaver eller tegn",
  LOGIN = "E-post eller passord er feil",
  PRIVACY_POLICY = "Du må samtykke til NSIs gjeldende personvernspolicy",
  NONE = "",
}

export const errorState = atom<string>({
  key: "errorState",
  default: "",
});

export const errorStateSelector = selector<ErrorTypes>({
  key: "errorCodeSelector",
  get: ({ get }) => {
    const code = get(errorState);
    switch (code) {
      case "auth/email-already-in-use":
        return { status: ErrorStatus.EMAIL, text: ErrorText.EMAIL_IN_USE };
      case "auth/invalid-email":
        return { status: ErrorStatus.EMAIL, text: ErrorText.WRONG_EMAIL };
      case "auth/weak-password":
        return { status: ErrorStatus.PASSWORD, text: ErrorText.WEAK_PASSWORD };
      case "not-match":
        return { status: ErrorStatus.PASSWORD, text: ErrorText.NOT_MATCH };
      case "required":
        return { status: ErrorStatus.OTHER, text: ErrorText.REQUIRED };
      case "login":
        return { status: ErrorStatus.OTHER, text: ErrorText.LOGIN };
      case "privacy":
        return { status: ErrorStatus.OTHER, text: ErrorText.PRIVACY_POLICY };
      case "":
        return { status: ErrorStatus.NONE, text: ErrorText.NONE };
      case "logout":
        return { status: ErrorStatus.OTHER, text: ErrorText.GENERAL };
      default:
        return { status: ErrorStatus.NONE, text: ErrorText.GENERAL };
    }
  },
});
