import { Button } from "@material-ui/core";
import React from "react";
import { firestore } from "../firebase";

// Generate new document to Firestore with data
const addDocToFirebase = () => {
  firestore
    .collection("snmApplications")
    .add({
      application: "snm",
      org: "NTNUI",
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

const FirebaseStorage = () => {
  return (
    <div>
      <Button onClick={() => addDocToFirebase()}>
        Lagre dokument til Firestore
      </Button>
    </div>
  );
};

export default FirebaseStorage;
