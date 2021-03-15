import { Attributes } from "react";
import { firestore } from "../../firebase";
import { attributesState } from "../../stateManagement/attributesState";
import { Attribute } from "../Template";

export const copyAttribute = async (
  collectionFrom: string,
  collectionTo: string,
  attributeName: string,
  chapter: string
) => {
  // document reference
  const docRef = firestore.collection(collectionFrom);
  let attributeslist: Array<Attribute> = [];
  let chapterExists: boolean = false;

  const attribute = firestore
    .collection(collectionFrom)
    .doc(`${chapter}`)
    .get();
  console.log("attribute", (await attribute).data());

  const ref = firestore.collection(collectionTo).doc();

  let data: any = {};
  data[`${chapter}.attributes.activity3`] = (
    await attribute
  ).data()!.attributes.activity1;

  firestore
    .collection(collectionTo)
    .doc("vGEccVpkhpQeAKoRZGfc")
    .update(data, { merge: true })
    .catch((error) => {
      console.error(
        "Error creating document",
        `${collectionTo}`,
        JSON.stringify(error)
      );
    });
};
