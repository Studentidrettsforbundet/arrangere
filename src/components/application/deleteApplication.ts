import firebase from "firebase";
import { firestore } from "../../firebase";

export const deleteApplication = async (
  applicationId: string,
  collectionName: string,
  userId: string
) => {
  if (applicationId && userId) {
    await firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .delete();
    const userApplications = await firestore
      .collection("user")
      .doc(userId)
      .get();
    const data = userApplications.data();

    if (data !== undefined) {
      for (const application in data.applications) {
        if (data.applications[application].id === applicationId) {
          let fieldPath = `applications.${application}`;
          await firestore
            .collection("user")
            .doc(userId)
            .update({ [fieldPath]: firebase.firestore.FieldValue.delete() });
        }
      }
    }
  } else {
    console.error("not possible to delete");
  }
};
