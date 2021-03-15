import { Button } from "@material-ui/core";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";
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

const FirebaseStorage = () => {
  const selectedAttribute = useRecoilValue(selectedAttributeState);

  const docData = {
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

      <Button onClick={() => setData(docData)}>
        Oppdater dokument i testCollection i Firestore
      </Button>
    </div>
  );
};

export default FirebaseStorage;
