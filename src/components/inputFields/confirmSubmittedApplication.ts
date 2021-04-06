import { firestore } from "../../firebase";


export const setStatusToSubmitted = async (docRef: any) => {
    let data: any = {};
    data[
        `status`
      ] = "submitted";

      docRef
      .update(data)
      .then(() => {
        console.log("Status updated!");
      })
      .catch((error: any) => {
        console.log("Error occured: ", error);
        throw new Error("Could not update field.");
        });
};
