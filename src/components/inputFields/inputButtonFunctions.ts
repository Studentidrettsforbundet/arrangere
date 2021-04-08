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

  let length;
  const attributesInApplication = await docRef
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        docExists = true;
      }
      let att = doc.data()![chapterName].attributes;
      let counter = 0;

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
        `${docRef}`,
        JSON.stringify(error)
      );
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

export const numberOfFields = async (
  docRef: any,
  attributeName: string,
  chapterName: string
) => {
  let counter = 0;
  await docRef
    .get()
    .then((doc: any) => {
      let nr = 0;
      let att = doc.data()![chapterName].attributes;
      Object.keys(att).forEach((attribute) => {
        if (attribute.includes(attributeName)) {
          nr++;
        }
      });
      counter = nr;
    })
    .catch((error: string) => {
      console.error(
        "Error reading from document",
        `${docRef}`,
        JSON.stringify(error)
      );
    });

  return counter;
};
