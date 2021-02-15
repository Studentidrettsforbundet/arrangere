
const assert =  require('assert');
const firebase = require("@firebase/testing");

describe("Our app", () => {
    it("Math", () => {
        assert.equal(2+2, 4);
    })

    it("Can read items in the read-only collection", async() => {
        const db = firebase.initializeTestApp({projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID}).firestore();
        const testDoc = db.collection("readonly").doc("testDoc");
        await firebase.assertSucceeds(testDoc.get());
    })
})