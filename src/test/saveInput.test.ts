/**
 * @jest-environment node
 */

 import {addFieldInputObject, saveInput} from "../components/inputFields/saveInputFields"
 import { getInputValue } from "../components/inputFields/getInputValue";
 import { firestore } from "../firebase";
 
 describe("Test", () => {

    it("test if addFieldInputObject sets fields", () => {
    const inputFieldObject = addFieldInputObject(
      "Trondheim",
      "general",
      {},
      "general-3"
    );
    expect(inputFieldObject).toBeDefined();
    expect((<any>inputFieldObject).chapterName).toEqual("general");
  }); 

    it("Test if input value gets saved and retrived", async () => {
        const object = {"general-3": "Fotball", chapterName: "general"}
        const docRef = firestore.collection("snmApplications").doc("ot8ttU6nGW7mtpltrZGZ");
        await saveInput(docRef, object)
        const value = await getInputValue(docRef, "general", "general-3")
        expect(value).toEqual("Fotball")
      })

      it("Test if input value gets saved and retrived in accordion", async () => {
        const object = {"activity-1": "Butterfly", "activity-2": "Amatør", "activity-3": "Dame", chapterName: "activities"}
        const docRef = firestore.collection("snmApplications").doc("ot8ttU6nGW7mtpltrZGZ");
        await saveInput(docRef, object)
        const value1 = await getInputValue(docRef, "activities", "activity-1")
        expect(value1).toEqual("Butterfly")
        const value2 = await getInputValue(docRef, "activities", "activity-2")
        expect(value2).toEqual("Amatør")
        const value3 = await getInputValue(docRef, "activities", "activity-3")
        expect(value3).toEqual("Dame")
      })

 })