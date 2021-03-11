import { Button } from "@material-ui/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
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

const getAllAttributesState = () => {
  const attributesState: any = [];
};

const getValueInputFields = () => {
  const db = firestore.collection("testCollection");
  const doc_id = "wM8RmJ5PVIJ90e9biJYC";

  const attributeIdList: Array<String> = [];
  let attributeName: string = "";

  //const attribute_id = "attributet som vi får fra input-feltet";
  const input_number = "nummeret til input feltet som vi også får fra staten";

  db.doc(doc_id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data: any = doc.data();
        let count: number = 0;
        // for hvert kapittel
        for (const key in data) {
          const chapter = data[key];
          // attributes-feltet i databasen
          const attributes = chapter.attributes;
          for (let attribute in attributes) {
            attributeName = attribute;
            console.log(attribute);
            const inputFields = attributes[attribute].input_fields;
            for (let inputField in inputFields) {
              // må finne ut hvor mange inputfelter vi har
              count++;
              //console.log(attributes[attribute].input_fields[inputField]);
            }
            console.log(count);

            for (let i = 0; i <= count; i++) {
              const attributeId = attributeName + i.toString();
              attributeIdList.push(attributeId);
            }
            count = 0;
          }
        }
        console.log(attributeIdList);
      } else {
        console.log("Doc does not exists");
      }
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

      <Button onClick={() => getValueInputFields()}>Hent et dokument</Button>
    </div>
  );
};

export default FirebaseStorage;
