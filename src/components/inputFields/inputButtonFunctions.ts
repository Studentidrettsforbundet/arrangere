import { Attributes } from "react";
import { firestore } from "../../firebase";
import { is_numeric } from "../utils";
import { InputField } from "./InputWrapper";

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
    let newAttributeName = attributeName + new Date().valueOf();

    data[`${chapterName}.attributes.${newAttributeName}`] =
      newAttribute[attributeName];
    docRef.update(data, { merge: true }).catch((error: string) => {
      console.error("Error updating document", JSON.stringify(error));
    });
    console.log("attributed created");
    return true;
  }

  return false;
};

export const createNewAttribute = async (
  docRef: any,
  attributeName: string,
  chapterName: string,
  inputFields: Array<InputField>
) => {
  let attributeObject: { [key: string]: Array<InputField> } = {};

  await docRef
    .get()
    .then((doc: any) => {
      let att = doc.data()![chapterName].attributes;

      Object.keys(att).forEach((attribute: any) => {
        let localInputFields: Array<InputField> = [];

        if (attribute == attributeName) {
          Object.assign(attributeObject, { [attribute]: inputFields });
        }

        if (attribute.includes(attributeName) && attribute != attributeName) {
          let inputNr: string = "";

          Object.keys(att[attribute].input_fields).forEach(
            (inputField: any) => {
              inputField.split("").forEach((character: any) => {
                if (is_numeric(character)) {
                  inputNr += character;
                }
              });
              localInputFields.push({
                type: att[attribute].input_fields[inputField].type,
                desc: att[attribute].input_fields[inputField].desc,
                priority: att[attribute].input_fields[inputField].priority,
                id: attribute + "-" + inputNr,
              });
              inputNr = "";
            }
          );
          Object.assign(attributeObject, { [attribute]: localInputFields });
        }
        localInputFields.sort((a: any, b: any) => a.priority - b.priority);
      });
    })
    .catch((error: string) => {
      console.error("Error creating", `${docRef}`, JSON.stringify(error));
    });

  return attributeObject;
};
