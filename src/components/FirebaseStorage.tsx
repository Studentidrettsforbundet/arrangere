import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";
import { choosenApplicationState } from "../stateManagement/choosenApplication";

type AttributesList = {
  id: string;
  chapter: string;
  attribute: Array<Array<Object>>;
};

async function loadFieldsFromStorage(collection: string, document: string) {
  const attributesList: Array<AttributesList> = [];

  // remember to fix this :)
  const collectionID = "testCollection";
  const docID = "vGEccVpkhpQeAKoRZGfc";

  let doc = await firestore.collection(collectionID).doc(docID).get();

  if (!doc.exists) {
    console.log("Doc does not exists");
    throw new Error("No document.");
  }

  let docData: any = doc.data();
  let attributeNr = 1;
  let attributeName;
  let chapterName;

  // Potential for simplification?
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

// This function should not live here, but rather a utils-file. The principle of least surprise is a good guideline :)
function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

const setData = (
  chapter: string,
  attribute: string,
  inputNr: string,
  value: string | undefined
) => {
  let data: any = {};
  data[
    `${chapter}.attributes.${attribute}.input_fields.input${inputNr}.value`
  ] = value;

  // Remember this
  firestore
    .collection("testCollection")
    .doc("vGEccVpkhpQeAKoRZGfc")
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
  collection: string,
  doc: string
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

  loadFieldsFromStorage(collection, doc).then((attribute) => {
    attribute.forEach((field) => {
      if (field.id == attributeID) {
        setData(field.chapter, attributeName, inputNr, value);
      }
    });
  });
}

const FirebaseStorage = () => {
  const selectedAttribute = useRecoilValue(selectedAttributeState);
  let collection = useRecoilValue(choosenApplicationState);
  collection += "Applications";

  // TODO render right document
  let doc: string = "";

  saveFieldToStorage(
    selectedAttribute?.id,
    selectedAttribute?.value,
    collection,
    doc
  );
};

export default FirebaseStorage;
