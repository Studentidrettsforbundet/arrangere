import { firestore } from "../../firebase";

export const copyAttribute = async (
  collectionFrom: string,
  collectionTo: string,
  attributeName: string,
  chapterName: string
): Promise<boolean> => {
  let docExists: boolean = false;
  let newAttribute: any;

  const collectionFromRef = firestore
    .collection(collectionTo)
    .doc("vGEccVpkhpQeAKoRZGfc");
  const collectionToRef = firestore
    .collection(collectionFrom)
    .doc(`${chapterName}`);

  let length;
  // get length of the attributelist in the application to know what id to give the new activity
  const attributesInApplication = await collectionFromRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        docExists = true;
      }
      let att = doc.data()![chapterName].attributes;
      let counter = 1;

      Object.keys(att).forEach((attribute) => {
        if (attribute.includes(attributeName)) {
          counter++;
        }
      });
      length = counter;
      return docExists;
    })
    .catch((error) => {
      console.error(
        "Error reading from document",
        `${collectionFrom}`,
        JSON.stringify(error)
      );
    });

  const attributeInTemplate = await collectionToRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        docExists = true;
      }
      newAttribute = doc.data()!.attributes;
      return docExists;
    })
    .catch((error) => {
      console.error(
        "Error reading from document",
        `${collectionTo}`,
        JSON.stringify(error)
      );
    });

  if (attributesInApplication && attributeInTemplate) {
    let data: any = {};
    data[`${chapterName}.attributes.${attributeName}${length}`] =
      newAttribute[attributeName];
    firestore
      .collection(collectionTo)
      .doc("vGEccVpkhpQeAKoRZGfc")
      .update(data, { merge: true })
      .catch((error) => {
        console.error(
          "Error updating document",
          `${collectionTo}`,
          JSON.stringify(error)
        );
      });
    return true;
  }
  return false;
};
