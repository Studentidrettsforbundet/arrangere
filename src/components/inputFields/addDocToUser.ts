import { firestore } from "../../firebase";



async function getNumberOfApplications(userID: string) {
  let counter: number = 1;
  const doc = await firestore.collection("user").doc(userID).get();

  const docData: any = doc.data();
  for (const application in docData.applications) {
    counter++;
  }
  return counter;
}

export const addDocToUser = async (userID: string, docID: string) => {
  

  let applicationNo: number = 0;
  try {
    await getNumberOfApplications(userID).then(
      (counter) => (applicationNo = counter)
    )
  } catch (error) {
    console.log("Errormelding: " + error)

  }

  if (applicationNo == 0) {
    firestore
      .collection("user")
      .doc(userID)
      .set({ applications: { application1: docID } })
      .then(() => console.log("Document added to user!"))
      .catch((error) => console.log(error));
  } else {
    let data: any = {};
    data[`applications.application${applicationNo}`] = docID;

    firestore
      .collection("user")
      .doc(userID)
      .update(data, { merge: true })
      .then(() => console.log("Document added to user!"))
      .catch((error) => console.log(error));
  }
};
