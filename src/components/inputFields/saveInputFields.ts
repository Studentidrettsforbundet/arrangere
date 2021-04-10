import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { is_numeric } from "../utils";

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const setDocID = useSetRecoilState(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  const setCollection = useSetRecoilState(choosenApplicationState);

  const changeCollection = useRecoilCallback(
    ({ snapshot }) => (choosenApplication: string) => {
      snapshot.getLoadable(choosenApplicationState);
      setCollection(choosenApplication);
    }
  );

  const changeDocID = useRecoilCallback(({ snapshot }) => (docID: string) => {
    snapshot.getLoadable(documentState);
    setDocID(docID);
  });

  changeCollection(collection);
  changeDocID(docID);

  if (docID && collection) {
    let docRef = firestore.collection(collection + "Applications").doc(docID);
    return docRef;
  }
}

// export function setInputFieldStatus(status: boolean) {
//   const setInputFieldSaved = useSetRecoilState(inputFieldSavedState);
//   setInputFieldSaved(status);
// }

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

      let data: any = {};
      data[
        `${inputFieldObject.chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`
      ] = value;

      docRef
        .update(data)
        .then(() => {
          console.log("Field updated!");
          // setInputFieldStatus(true);
        })
        .catch((error: any) => {
          console.log("Error occured: ", error);
          // setInputFieldStatus(false);
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
