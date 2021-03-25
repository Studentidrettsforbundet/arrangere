import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { documentState } from "../ApplicationCard";

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  let docRef = firestore.collection(collection + "Applications").doc(docID);
  return docRef;
}

export const saveInput = (docRef: any, inputFieldObject: any) => {
  Object.entries(inputFieldObject).forEach(([key, value]) => {
    console.log("chapterName", key);
    if (key != "chapterName") {
      let attributeName: string = "";
      let inputNr: string = "";
      key.split("").forEach((character) => {
        if (is_numeric(character)) {
          inputNr += character;
        } else {
          attributeName += character;
        }
      });

      let data: any = {};
      data[
        `${inputFieldObject.chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`
      ] = value;
      docRef
        .update(data)
        .then(() => {
          console.log("Field updated!");
        })
        .catch((error: any) => {
          console.log("Error occured: ", error);
          throw new Error("Could not update field.");
        });
    }
  });
};

export const addFieldInputObject = (
  value: string,
  chapterName: string,
  inputFieldObject: Object,
  id: string
) => {
  let inputFieldObjectLocal = Object.assign({}, inputFieldObject);
  Object.assign(inputFieldObjectLocal, { [id]: value });
  Object.assign(inputFieldObjectLocal, { chapterName: chapterName });
  console.log(inputFieldObjectLocal);
  return inputFieldObjectLocal;
};
