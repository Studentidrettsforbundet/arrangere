import { firestore } from "../../firebase";
import { is_numeric } from "../utils";
import firebase from "firebase";

export const copyAttributeFromTemplateToApplication = async (
  template: string,
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  attributeName: string,
  chapterName: string
) => {
  let attributeObjectList: [
    { [key: string]: { input_fields: Array<InputField>; priority: number } }
  ] = [{}];
  let newAttribute: any;

  const collectionToRef = firestore
    .collection(template + "Template")
    .doc(`${chapterName}`);

  const attributeInTemplate = await collectionToRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        newAttribute = doc.data()!.attributes;
        return newAttribute;
      }
    })
    .catch((error) => {
      console.error("Error reading from document first", JSON.stringify(error));
    });

  if (attributeInTemplate) {
    await docRef
      .get()
      .then((doc: any) => {
        if (doc.exists) {
          let att = doc.data()![chapterName].attributes;
          let counter = 0;
          let highestPriority: number = 1;
          Object.keys(att).forEach((attribute) => {
            if (attribute.includes(attributeName)) {
              counter++;
              if (att[attribute].priority >= highestPriority) {
                highestPriority = parseInt(att[attribute].priority) + 1;
              }
            }
          });
          let data: any = {};
          let data2: any = {};

          let newAttributeName = attributeName + highestPriority;

          attributeObjectList = getOneNewAttribute(
            newAttributeName,
            newAttribute,
            highestPriority
          );

          data[`${chapterName}.attributes.${newAttributeName}`] =
            newAttribute[attributeName];

          docRef.update(data, { merge: true }).catch((error: string) => {
            console.error("Error updating document", JSON.stringify(error));
          });

          data2[
            `${chapterName}.attributes.${newAttributeName}.priority`
          ] = highestPriority;

          docRef.update(data2).catch((error: string) => {
            console.error("Error updating document", JSON.stringify(error));
          });
        }
      })
      .catch((error: string) => {
        console.error(
          "Error reading from document second",
          `${docRef}`,
          JSON.stringify(error)
        );
      });
  }
  return attributeObjectList;
};

//generates new ids on each inputfield and returns it
const getOneNewAttribute = (
  attributeName: string,
  att: any,
  priority: number
) => {
  let attributeObjectList: [
    { [key: string]: { input_fields: Array<InputField>; priority: number } }
  ] = [{}];

  Object.keys(att).forEach((attribute: any) => {
    let localInputFields: Array<InputField> = [];
    if (attribute == attributeName) {
      attributeObjectList.push({
        [attribute]: {
          input_fields: att[attribute].input_fields,
          priority: att[attribute].priority,
        },
      });
    }
    let inputNr: string = "";
    Object.keys(att[attribute].input_fields).forEach((inputField: any) => {
      inputField.split("").forEach((character: any) => {
        if (is_numeric(character)) {
          inputNr += character;
        }
      });
      localInputFields.push({
        type: att[attribute].input_fields[inputField].type,
        desc: att[attribute].input_fields[inputField].desc,
        priority: att[attribute].input_fields[inputField].priority,
        id: attributeName + "-" + inputNr,
      });
      inputNr = "";
    });
    localInputFields.sort((a: any, b: any) => a.priority - b.priority);
    attributeObjectList = [
      {
        [attributeName]: {
          input_fields: localInputFields,
          priority: priority,
        },
      },
    ];
  });

  return attributeObjectList;
};

export const getListOfAttributes = async (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  attributeName: string,
  chapterName: string
) => {
  let attributeObjectList: [
    { [key: string]: { input_fields: Array<InputField>; priority: number } }
  ] = [{}];

  await docRef
    .get()
    .then((doc: any) => {
      let att = doc.data()![chapterName].attributes;
      Object.keys(att).forEach((attribute: any) => {
        if (attribute.includes(attributeName)) {
          let list = getOneNewAttribute(
            attribute,
            att,
            att[attribute].priority
          );
          attributeObjectList.push(list[0]);
        }
      });
    })
    .catch((error: string) => {
      console.error("Error creating", `${docRef}`, JSON.stringify(error));
    });
  attributeObjectList.splice(0, 1);

  attributeObjectList.sort(
    (a: any, b: any) =>
      a[Object.keys(a)[0]].priority - b[Object.keys(b)[0]].priority
  );
  return attributeObjectList;
};
