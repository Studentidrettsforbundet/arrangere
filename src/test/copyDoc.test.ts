/**
 * @jest-environment node
 */

import {copyDoc} from "../components/inputFields/copyDoc"
import { firestore } from "../firebase";

describe("Test", () => {

    it("Copy doc from template to snmApplication", async () => {
        const newDocID = await copyDoc("snm");
        const data =  expect((await firestore.collection("snmApplications").doc(newDocID).get()).exists).toBeTruthy()
    })

    it("Copy doc from template to scApplication", async () => {
        const newDocID = await copyDoc("sc");
        const data =  expect((await firestore.collection("scApplications").doc(newDocID).get()).exists).toBeTruthy()
    })

    it("Copy doc from template to slApplication", async () => {
        const newDocID = await copyDoc("sl");
        const data =  expect((await firestore.collection("slApplications").doc(newDocID).get()).exists).toBeTruthy()
    })

    
})