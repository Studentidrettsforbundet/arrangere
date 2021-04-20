/**
* @jest-environment node
*/

import {
    saveInput,
    } from "../components/inputFields/saveInputFields";
    import { getInputValue } from "../components/inputFields/getInputValue";
    import { firestore } from "../firebase";
    import { setStatusToSubmitted } from "../components/inputFields/setStatusToSubmitted";
    describe("Test", () => {
    it("Test if status field gets updated to submitted on doc", async () => {
    const docRef = firestore
    .collection("snmApplications")
    .doc("ot8ttU6nGW7mtpltrZGZ");
    await setStatusToSubmitted(
    docRef,
    "SqHIu7oPUeaQKU19ev2UFpjXMsv2",
    "ot8ttU6nGW7mtpltrZGZ"
    );
    let fieldPath = `status`;
    let value = await firestore
    .collection("snmApplications")
    .doc("ot8ttU6nGW7mtpltrZGZ")
    .get()
    .then((res: any) => {
    return res.get(fieldPath);
    })
    .catch((error: any) => {
    console.log("Error in retrieving value:", error);
    });
    expect(value).toEqual("submitted");
    });
    it("Test if status field gets updated to submitted on user", async () => {
    const docRef = firestore
    .collection("snmApplications")
    .doc("ot8ttU6nGW7mtpltrZGZ");
    await setStatusToSubmitted(
    docRef,
    "SqHIu7oPUeaQKU19ev2UFpjXMsv2",
    "ot8ttU6nGW7mtpltrZGZ"
    );
    let fieldPath = `applications.ot8ttU6nGW7mtpltrZGZ.status`;
    let value = await firestore
    .collection("user")
    .doc("SqHIu7oPUeaQKU19ev2UFpjXMsv2")
    .get()
    .then((res: any) => {
    console.log(res.get(fieldPath));
    return res.get(fieldPath);
    })
    .catch((error: any) => {
    console.log("Error in retrieving value:", error);
    });
    expect(value).toEqual("submitted");
    });
    });