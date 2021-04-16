import { firestore } from "../../firebase";

export async function getNumberOfApplications(userID: string) {
  let counter: number = 1;
  const doc = await firestore.collection("user").doc(userID).get();

  const docData: any = doc.data();

  for (const application in docData.applications) {
    counter++;
  }
  return counter;
}

export const addDocToUser = async (
  userID: string,
  docID: string,
  collection: string
) => {
  let applicationNr: number = 0;

  await getNumberOfApplications(userID).then(
    (counter) => (applicationNr = counter)
  );

  var applicationData = {
    id: docID,
    status: "in progress",
    collection: collection,
  };
  if (applicationNr == 0) {
    firestore
      .collection("user")
      .doc(userID)
      .set({ applications: { application1: applicationData } })
      .then(() => console.log("Document added to user!"))
      .catch((error) => console.log(error));
  } else {
    let data: any = {};
    data[`applications.application${applicationNr}`] = applicationData;

    firestore
      .collection("user")
      .doc(userID)
      .update(data, { merge: true })
      .then(() => console.log("Document added to user!"))
      .catch((error) => console.log(error));
  }
};
