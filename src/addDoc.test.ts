/**
 * @jest-environment node
 */

//import firebase from "@firebase/rules-unit-testing";
import {addFieldInputObject, saveInput} from "./components/inputFields/saveInputFields"
import {getNumberOfApplications, addDocToUser} from "./components/inputFields/addDocToUser"
import {copyDoc} from "./components/inputFields/copyDoc"
import { firestore } from "./firebase";
import firebase from "firebase"
import { getInputValue } from "./components/inputFields/getInputValue";

describe("", () => {
  it("test if addFieldInputObject sets fields", () => {
    const inputFieldObject = addFieldInputObject(
      "Trondheim",
      "general",
      {},
      "general-3"
    );
    expect(inputFieldObject).toBeDefined();
    expect(inputFieldObject.chapterName).toEqual("general");
  });

it("Test if doc is added to user", async () => {

    await addDocToUser("y0Z97CZIC0NPEz2QbUl3BoXzvPZz", "newDocIDI7OUcA12yWZ5", "snm")
    const counter = await getNumberOfApplications("y0Z97CZIC0NPEz2QbUl3BoXzvPZz");
    expect(counter).toEqual(3);

    await firestore.collection("user").doc("y0Z97CZIC0NPEz2QbUl3BoXzvPZz").set({"applications" : { ["application2"]: firebase.firestore.FieldValue.delete()}}, { merge: true }).then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
});

it("Get number of applications", async () => {
    
    const counter = await getNumberOfApplications("y0Z97CZIC0NPEz2QbUl3BoXzvPZz");
    expect(counter).toEqual(2);
  });
});

it("Copy doc from template to application collection", async () => {
    const newDocID = await copyDoc("snm");
    const data =  expect((await firestore.collection("snmApplications").doc(newDocID).get()).exists).toBeTruthy()
})

it("Test if input value gets saved and retrived", async () => {
  const object = {"general-3": "Fotball", chapterName: "general"}
  const docRef = firestore.collection("snmApplications").doc("7uIx8AWpva80rOH7Vyvl");
  await saveInput(docRef, object)
  const value = await getInputValue(docRef, "general", "general-3")
  expect(value).toEqual("Fotball")
})

