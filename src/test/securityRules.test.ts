require('dotenv').config()

import * as assert from "assert";
import * as firebase from "@firebase/testing";

// Testing of Firebase rules clearly needs a lot of work
describe("Our app", () => {
  it("Math", () => {
    assert.equal(2 + 2, 4);
  });

  it("Can read items in the read-only collection", async () => {
    const db = firebase
      .initializeTestApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      
      })
      .firestore();
    const testDoc = db.collection("readonly").doc("testDoc");
    await firebase.assertSucceeds(testDoc.get());
  });
});
