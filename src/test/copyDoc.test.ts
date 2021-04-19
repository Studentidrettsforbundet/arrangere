/**
 * @jest-environment node
 */

import { copyDoc } from "../components/inputFields/copyDoc";
import { firestore } from "../firebase";

describe("Test", () => {
  it("Copy doc from template to application collection", async () => {
    const newDocID = await copyDoc("snm");
    const data = expect(
      (await firestore.collection("snmApplications").doc(newDocID).get()).exists
    ).toBeTruthy();
  });
});
