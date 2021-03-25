import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { documentState } from "../ApplicationCard";
import { is_numeric } from "../utils";

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  let docRef = firestore.collection(collection + "Applications").doc(docID);
  return docRef;
}

export const saveInput = (docRef: any, inputFieldObject: any) => {
  Object.entries(inputFieldObject).forEach(([key, value]) => {
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
      console.log("attributename", attributeName);
      console.log("inputnr", inputNr);
      console.log("value", value);

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
