import { firestore } from "../../firebase";

export const addDocumentToUser = async (
  userID: string,
  docID: string,
  collection: string
) => {
  var applicationData = {
    id: docID,
    status: "in progress",
    collection: collection,
  };

  let data: any = {};
  data[`applications.${docID}`] = applicationData;

  firestore.collection("user").doc(userID).update(data, { merge: true });
};
