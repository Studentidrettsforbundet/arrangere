import { firestore } from "../firebase";

type AttributesList = {
  id: string;
  chapter: string;
  attribute: Array<Array<Object>>;
};

async function loadFieldsFromDocument(collectionID: string, docID: string) {
  const attributesList: Array<AttributesList> = [];

  const doc = await firestore
    .collection(collectionID + "Applications")
    .doc(docID)
    .get();

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

function saveFieldToDocument(
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

  loadFieldsFromDocument(collectionID, docID).then((attribute) => {
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

export default saveFieldToDocument;
