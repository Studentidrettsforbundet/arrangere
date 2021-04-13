import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

export function useDocRef() {
  const docID = useRecoilValue(currentApplicationIdState);
  const setDocID = useSetRecoilState(currentApplicationIdState);
  const collection = useRecoilValue(currentCollectionState);
  const setCollection = useSetRecoilState(currentCollectionState);

  const changeCollection = useRecoilCallback(
    ({ snapshot }) => (choosenApplication: string) => {
      snapshot.getLoadable(currentCollectionState);
      setCollection(choosenApplication);
    }
  );

  const changeDocID = useRecoilCallback(({ snapshot }) => (docID: string) => {
    snapshot.getLoadable(currentApplicationIdState);
    setDocID(docID);
  });

  changeCollection(collection);
  changeDocID(docID);

  if (docID && collection) {
    let docRef = firestore.collection(collection).doc(docID);
    return docRef;
  }
}

export const saveInput = (docRef: any, inputFieldObject: any) => {
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
