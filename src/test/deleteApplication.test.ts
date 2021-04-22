/**
 * @jest-environment node
 */
 import { deleteApplication } from "../components/user/deleteApplication";
 import { firestore } from "../firebase";
 
 describe("Test", () =>{
     if('Test if application gets deleted when user tries to', async () => {
        const docRef = firestore
            .collection('')
            .doc('');    
        })
 });