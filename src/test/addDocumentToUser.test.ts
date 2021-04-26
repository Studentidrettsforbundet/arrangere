/**
 * @jest-environment node
 */
//import firebase from "@firebase/rules-unit-testing";
import { firestore } from "../firebase";
import { addDocumentToUser } from "../components/application/addDocumentToUser";

describe("Test if ", () => {
  it("Test if doc is added to user", async () => {
    await addDocumentToUser(
      "SqHIu7oPUeaQKU19ev2UFpjXMsv2",
      "newDocIDI7OUcA12yWZ5",
      "snm"
    );
    let fieldPath = `applications.newDocIDI7OUcA12yWZ5.id`;
    let value = await firestore
      .collection("user")
      .doc("SqHIu7oPUeaQKU19ev2UFpjXMsv2")
      .get()
      .then((res: any) => {
        return res.get(fieldPath);
      });

    expect(value).toEqual("newDocIDI7OUcA12yWZ5");
  });
});
