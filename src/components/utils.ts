import React from "react";

export function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

export function splitToAttributeName(str: string) {
  let attributeName: string = "";
  str.split("").forEach((character) => {
    if (!is_numeric(character)) {
      attributeName += character;
    }
  });
  return attributeName;
}

export function splitToInputNr(str: string) {
  let inputNr: string = "";
  str.split("").forEach((character) => {
    if (is_numeric(character)) {
      inputNr += character;
    }
  });
  return inputNr;
}
