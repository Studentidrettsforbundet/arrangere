import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";
import { choosenApplicationState } from "../stateManagement/choosenApplication";

type AttributesList = {
  id: string;
  chapter: string;
  attribute: Array<Array<Object>>;
};

async function loadFieldsFromStorage(collectionID: string, docID: string) {
  const attributesList: Array<AttributesList> = [];

  console.log("collection to be saved to: ", collectionID + "Applications");
  console.log("doc to be saved to:", docID);

  let doc = await firestore
    .collection(collectionID + "Applications")
    .doc(docID)
    .get();
  console.log("collectiondID to be saved to:", collectionID);
  console.log("docId to be saved to", docID);

  if (!doc.exists) {
    console.log("Doc does not exists");
    throw new Error("No document.");
  }

  let docData: any = doc.data();
  let attributeNr: number = 1;
  let attributeName: string = "";
  let chapterName: string = "";

  for (const key in docData) {
    chapterName = key;
    const attributes = docData[key].attributes;
    for (let attribute in attributes) {
      attributeName = attribute;
      const inputFields = attributes[attribute].input_fields;
      for (let inputField in inputFields) {
        const inputFieldObject = attributes[attribute].input_fields[inputField];
        attributesList.push({
          id: attributeName + attributeNr.toString(),
          chapter: chapterName,
          attribute: inputFieldObject,
        });
        attributeNr++;
      }
      attributeNr = 1;
    }
  }
  return attributesList;
}

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

const setData = (
  chapter: string,
  attribute: string,
  inputNr: string,
  value: string | undefined,
  collectionID: string,
  docID: string
) => {
  let data: any = {};
  data[
    `${chapter}.attributes.${attribute}.input_fields.input${inputNr}.value`
  ] = value;

  firestore
    .collection(collectionID + "Applications")
    .doc(docID)
    .update(data, { merge: true })
    .then(() => {
      console.log("Field updated!");
    })
    .catch((error) => {
      console.log("Error occured: ", error);
      throw new Error("Could not update field.");
    });
};

function saveFieldToStorage(
  attributeID: string | undefined,
  value: string | undefined,
  collectionID: string,
  docID: string
) {
  let attributeName: string = "";
  let inputNr: string = "";

  attributeID?.split("").forEach((character) => {
    if (is_numeric(character)) {
      inputNr += character;
    } else {
      attributeName += character;
    }
  });

  loadFieldsFromStorage(collectionID, docID).then((attribute) => {
    attribute.forEach((field) => {
      if (field.id == attributeID) {
        setData(
          field.chapter,
          attributeName,
          inputNr,
          value,
          collectionID,
          docID
        );
      }
    });
  });
}

export default saveFieldToStorage;

// const FirebaseStorage = (docID: string) => {
//   const selectedAttribute = useRecoilValue(selectedAttributeState);
//   let collection = useRecoilValue(choosenApplicationState);
//   collection += "Applications";

//   saveFieldToStorage(
//     selectedAttribute?.id,
//     selectedAttribute?.value,
//     collection,
//     docID
//   );
// };

// export default FirebaseStorage;
