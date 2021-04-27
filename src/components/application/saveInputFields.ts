import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { applicationIDState } from "../../stateManagement/attributesState";
import { applicationTypeState } from "../../stateManagement/applicationState";

export function useDocRef() {
  const docID = useRecoilValue(applicationIDState);
  const collection = useRecoilValue(applicationTypeState);

  if (docID && collection) {
    let docRef = firestore.collection(collection + "Applications").doc(docID);
    return docRef;
  }
}

export const saveInput = async (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  inputFieldObject: any
) => {
  let status = true;

  for (const [key, value] of Object.entries(inputFieldObject)) {
    if (key !== "chapterName") {
      let attributeName: string = "";
      let inputNr: string = "";
      let newKey = key.split("-");
      inputNr = newKey[1];
      attributeName += newKey[0];

      let data: any = {};
      data[
        `${inputFieldObject.chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`
      ] = value;

      await docRef.update(data).catch(() => {
        status = false;
      });
    }
  }
  return status;
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
  return inputFieldObjectLocal;
};
