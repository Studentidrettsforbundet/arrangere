import { firestore } from "../../firebase";

export const copyAttribute = async (
  template: string,
  docRef: any,
  attributeName: string,
  chapterName: string
): Promise<boolean> => {
  let docExists: boolean = false;
  let newAttribute: any;

  const collectionToRef = firestore
    .collection(template + "Template")
    .doc(`${chapterName}`);

  let length;
  // get length of the attributelist in the application to know what id to give the new activity
  const attributesInApplication = await docRef
    .get()
    .then((doc: any) => {
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
    .catch((error: string) => {
      console.error(
        "Error reading from document",
        `${template}`,
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
      console.error("Error reading from document", JSON.stringify(error));
    });

  if (attributesInApplication && attributeInTemplate) {
    let data: any = {};
    data[`${chapterName}.attributes.${attributeName}${length}`] =
      newAttribute[attributeName];
    docRef.update(data, { merge: true }).catch((error: string) => {
      console.error("Error updating document", JSON.stringify(error));
    });
    return true;
  }
  return false;
};
