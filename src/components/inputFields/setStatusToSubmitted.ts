import { firestore } from "../../firebase";
import firebase from "firebase";

export const setStatusToSubmitted = async (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  userID: string,
  application: string
) => {
  docRef
    .update({
      status: "submitted",
    })
    .then(() => {
      console.log("Status updated in doc!");
    });

  let userStatus: any = {};
  userStatus[`applications.${application}.status`] = "submitted";

  firestore
    .collection("user")
    .doc(userID)
    .update(userStatus)
    .then(() => console.log("Status updated on user!"));
};
