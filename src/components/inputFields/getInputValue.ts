import firebase from "firebase";

export async function getInputValue(
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  chapterName: string,
  id: string
) {
  let value = "";

  if (docRef === undefined) {
    return value;
  }

  let newKey = id.split("-");
  let attributeName = newKey[0];
  let inputNr = newKey[1];

  let fieldPath = `${chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`;

  await docRef
    .get()
    .then((res: firebase.firestore.DocumentData) => {
      value = res.get(fieldPath);
      return value;
    })
    .catch((error) => {
      console.log("Error in retrieving value:", error);
    });
  return value;
}
