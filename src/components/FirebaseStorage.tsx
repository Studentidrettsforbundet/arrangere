import { Button } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import ShortText, { selectedAttributeState } from "./inputFields/ShortText";

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

const setData = (docData: any) {
    firestore.collection("testCollection").doc("pzYKnYEpVdAMCbPaPDbG");
}

const FirebaseStorage = () => {
  const selectedAttribute = useRecoilValue(selectedAttributeState);

  console.log(selectedAttribute?.id);

  const docData = {
    input1: selectedAttribute?.id,
    value: selectedAttribute?.value,
  };

  return (
    <div>
      <ShortText
        desc="Input-feltet her skal lagres i Firestore"
        id="input1"
      ></ShortText>
      <ShortText
        desc="Input-feltet her skal lagres i Firestore"
        id="input2"
      ></ShortText>

      <Button onClick={() => addDocToFirebase(docData)}>
        Lagre dokument til Firestore
      </Button>
    </div>
  );
};

export default FirebaseStorage;
