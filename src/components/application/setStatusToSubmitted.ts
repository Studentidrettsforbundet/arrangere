import firebase from "firebase";
import { firestore } from "../../firebase";

export const setStatusToSubmitted = async (
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
  userID: string,
  application: string
) => {
  await docRef.update({
    status: "submitted",
  });

  let userStatus: any = {};
  userStatus[`applications.${application}.status`] = "submitted";

  await firestore.collection("user").doc(userID).update(userStatus);
};
