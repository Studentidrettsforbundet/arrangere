import { Button } from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { firestore } from "../firebase";
import {
  attributesState,
  selectedAttributeState,
  selectedAttributeIdState,
} from "../stateManagement/attributesState";
import ShortText from "./inputFields/ShortText";

// Generate new document to Firestore with data
const addDocToFirebase = (docData: any) => {
  firestore
    .collection("snmApplications")
    .add(docData)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

// Update a single field in the doc
const setData = (docData: any) => {
  firestore
    .collection("testCollection")
    .doc("pzYKnYEpVdAMCbPaPDbG")
    .update({
      "chapter-1.attributes.comments.input_fields.input1.value": docData,
    })
    .then(() => {
      console.log("Field updated!");
    })
    .catch((error) => {
      console.error("Error updating field: ", error);
    });
};

// change to loadFieldsFromStorage()
async function getInputFieldsFromApplicationDocument() {
  const attributesListLocal: Array<any> = [];

  const db = firestore.collection("testCollection");
  const doc_id = "wM8RmJ5PVIJ90e9biJYC";

  let attributeName: string = "";

  let doc = await db.doc(doc_id).get();

  if (!doc.exists) {
    console.log("Doc does not exists");
    throw new Error("No document.");
  }

  let data: any = doc.data();
  let count: number = 0;

  // for hvert kapittel
  for (const key in data) {
    const chapter = data[key];
    // attributes-feltet i databasen
    const attributes = chapter.attributes;
    for (let attribute in attributes) {
      attributeName = attribute;
      //console.log(attribute);
      const inputFields = attributes[attribute].input_fields;
      for (let inputField in inputFields) {
        // må finne ut hvor mange inputfelter vi har
        const inputFieldObject = attributes[attribute].input_fields[inputField];
        attributesListLocal.push([
          attributeName + (count + 1).toString(),
          inputFieldObject,
        ]);
        count++;
      }
      count = 0;
    }
  }
  return attributesListLocal;
}

function is_numeric(str: string) {
  return /^\d+$/.test(str);
}

function getFieldToBeUpdated(
  attributeID: string | undefined,
  value: string | undefined
) {
  let chapter: string = "";
  let inputNr: string = "";

  // Finne ut hvilken attributt + input som skal bli oppdatert
  attributeID?.split("").forEach((character) => {
    if (is_numeric(character)) {
      inputNr += character;
    } else {
      chapter += character;
    }
  });

  const setData = (chapter: string, inputNr: string) => {
    let data: any = {};
    data[
      `${chapter}.attributes.${chapter}.input_fields.input${inputNr}.value`
    ] = value;

    firestore
      .collection("testCollection")
      .doc("wM8RmJ5PVIJ90e9biJYC")
      .update(
        data,
        { merge: true }
        //`${chapter}).attributes.${chapter}.input_fields.input${inputNr}.value`: value,
      )
      .then(() => {
        console.log("Field updated!");
      })
      .catch((error) => {
        console.log("Error occured: ", error);
      });
  };

  getInputFieldsFromApplicationDocument().then((attribute) => {
    attribute.forEach((field) => {
      if (field[0] == attributeID) {
        setData(chapter, inputNr);
      }
    });
  });
}

const FirebaseStorage = () => {
  const selectedAttribute = useRecoilValue(selectedAttributeState);
  console.log(selectedAttribute);

  getFieldToBeUpdated(selectedAttribute?.id, selectedAttribute?.value);

  const docData = {
    value: selectedAttribute?.value,
  };

  return (
    <div>
      <ShortText
        desc="Input-feltet her skal lagres i Firestore"
        id="general1"
      ></ShortText>
      <ShortText
        desc="Input-feltet her skal lagres i Firestore"
        id="general2"
      ></ShortText>

      <Button onClick={() => addDocToFirebase(docData)}>
        Lagre dokument til Firestore
      </Button>

      <Button onClick={() => setData(docData)}>
        Oppdater dokument i testCollection i Firestore
      </Button>

      <Button onClick={() => getInputFieldsFromApplicationDocument()}>
        Hent en søknad og lagre en value
      </Button>
    </div>
  );
};

export default FirebaseStorage;
