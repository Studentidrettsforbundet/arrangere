import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { documentState } from "../ApplicationCard";

type Props = {
  id: string;
  value: string;
  chapterName: string;
};

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);

  let docRef = firestore.collection(collection + "Applications").doc(docID);

  return docRef;
}

export const saveInput = (
  id: string,
  value: string,
  chapterName: string,
  docRef: any
) => {
  let attributeName: string = "";
  let inputNr: string = "";

  id.split("").forEach((character) => {
    if (is_numeric(character)) {
      inputNr += character;
    } else {
      attributeName += character;
    }
  });

  let data: any = {};
  data[
    `${chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`
  ] = value;

  docRef
    .update(data, { merge: true })
    .then(() => {
      console.log("Field updated!");
    })
    .catch((error: any) => {
      console.log("Error occured: ", error);
      throw new Error("Could not update field.");
    });
};
