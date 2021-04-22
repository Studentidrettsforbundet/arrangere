import { firestore } from "../../firebase";
import firebase from "firebase";

export const setStatusToSubmitted = async (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  userID: string,
  application: string
) => {
  let docStatus: any = {};
  docStatus[`status`] = "submitted";

  docRef
    .update(docStatus)
    .then(() => {
      console.log("Status updated in doc!");
    })
    .catch((error: any) => {
      console.log("Error occured: ", error);
      throw new Error("Could not update field.");
    });

  let userStatus: any = {};
  userStatus[`applications.${application}.status`] = "submitted";

  firestore
    .collection("user")
    .doc(userID)
    .update(userStatus)
    .then(() => console.log("Status updated on user!"))
    .catch((error) => console.log(error));
};
