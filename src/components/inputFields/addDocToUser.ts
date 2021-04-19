import { firestore } from "../../firebase";

export const addDocToUser = async (
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
  data[`applications.application${docID}`] = applicationData;

  firestore
    .collection("user")
    .doc(userID)
    .update(data, { merge: true })
    .then(() => console.log("Document added to user!"))
    .catch((error) => console.log(error));
};
