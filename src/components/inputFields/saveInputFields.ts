import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import firebase from "firebase";

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);

  if (docID && collection) {
    let docRef = firestore.collection(collection + "Applications").doc(docID);
    return docRef;
  }
}

export const saveInput = (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  inputFieldObject: any
) => {
  Object.entries(inputFieldObject).forEach(([key, value]) => {
    if (key != "chapterName") {
      let attributeName: string = "";
      let inputNr: string = "";
      let newKey = key.split("-");
      inputNr = newKey[1];
      attributeName += newKey[0];

      let data: any = {};
      data[
        `${inputFieldObject.chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`
      ] = value;

      docRef
        .update(data)
        .then(() => {
          console.log("Field updated!");
        })
        .catch((error) => {
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
