import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { is_numeric } from "../utils";

export function useDocRef() {
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  if (docID && collection) {
    let docRef = firestore.collection(collection + "Applications").doc(docID);
    return docRef;
  }
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

// export async function getNumberOfApplications(userID: string) {
//   let counter: number = 0;
//   const doc = await firestore.collection("user").doc(userID).get();

//   const docData: any = doc.data();
//   for (const application in docData.applications) {
//     counter++;
//   }
//   return counter;
// }

// const addDocToUser = async (userID: string, docID: string) => {
//   let applicationNr: string = "";
//   await getNumberOfApplications(userID).then(
//     (counter) => (applicationNr = counter.toString())
//   );

//   console.log(applicationNr);

//   let data: any = {};
//   data[`applications.application${applicationNr}`] = docID;

//   firestore
//     .collection("user")
//     .doc(userID)
//     .update(data, { merge: true })
//     .then(() => console.log("Field updated!"))
//     .catch((error) => console.log(error));
// };

// export default addDocToUser;
