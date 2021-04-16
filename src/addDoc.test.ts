/**
 * @jest-environment node
 */

//import firebase from "@firebase/rules-unit-testing";
import {addFieldInputObject} from "./components/inputFields/saveInputFields"
import {getNumberOfApplications, addDocToUser} from "./components/inputFields/addDocToUser"
import {copyDoc} from "./components/inputFields/copyDoc"
import firebase, { firestore } from "./firebase";
/* import { auth } from "./firebase";
import firebase from "firebase";

beforeEach(() => {
    var db = firebase.firestore();
    auth.createUserWithEmailAndPassword(
        "siw@gmail.com",
        "siw1234"
      )
      .then((cred) => {
        if (cred.user != null) {
          return db.collection("user").doc(cred.user.uid).set({
            organization: "",
            role: "",
            email: "siw@gmail.com",
            applications: {},
          });
        }
      })
      .catch((err: any) => {
        console.log("Something went wrong")
      });
}); */

afterEach(() => {
    
  });

describe("", () => {
it("test if addFieldInputObject sets fields", () => {

    const inputFieldObject = addFieldInputObject("Trondheim", "general", {}, "general-3");
    expect(inputFieldObject).toBeDefined();
    expect(inputFieldObject.chapterName).toEqual("general");
  });

it("Test if doc is added to user", async () => {

    await addDocToUser("QY1khY1DrpNUD20E1QcXKTypeBte", "newDocIDI7OUcA12yWZ5", "snm")
    const counter = await getNumberOfApplications("QY1khY1DrpNUD20E1QcXKTypeBte");
    expect(counter).toEqual(2);
});

it("Get number of applications", async () => {
    
    const counter = await getNumberOfApplications("QY1khY1DrpNUD20E1QcXKTypeBte");
    expect(counter).toEqual(2);
});
});

it("Copy doc from template to application collection", async () => {
    const newDocID = await copyDoc("snm");
    const data =  expect((await firestore.collection("snmApplications").doc(newDocID).get()).exists).toBeTruthy()
})