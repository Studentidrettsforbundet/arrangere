import { firestore } from "../firebase";

export async function getNumberOfApplications(userID: string) {
  let counter: number = 0;
  const doc = await firestore.collection("user").doc(userID).get();

  const docData: any = doc.data();
  for (const application in docData.applications) {
    counter++;
  }
  return counter;
}

const addDocToUser = async (userID: string, docID: string) => {
  let applicationNr: string = "";
  await getNumberOfApplications(userID).then(
    (counter) => (applicationNr = counter.toString())
  );

  console.log(applicationNr);

  let data: any = {};
  data[`applications.application${applicationNr}`] = docID;

  firestore
    .collection("user")
    .doc(userID)
    .update(data, { merge: true })
    .then(() => console.log("Field updated!"))
    .catch((error) => console.log(error));
};

export default addDocToUser;
