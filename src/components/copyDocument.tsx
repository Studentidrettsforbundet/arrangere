import { Button } from "@material-ui/core";
import React from "react";

import { firestore } from "../firebase";
import { Chapter } from "./Template";

export const copyDoc = async (
  collectionFrom: string,
  collectionTo: string
): Promise<boolean> => {
  // document reference
  const docRef = firestore.collection(collectionFrom);
  let chapterListLocal: Array<Chapter> = [];
  let chapterExists: boolean = false;

  // copy the document
  const docData = await docRef
    .get()
    .then((doc) => {
      doc.forEach((chapter) => {
        if (chapter.exists) {
          chapterExists = true;
        }
        chapterListLocal.push({
          title: chapter.data().title,
          desc: chapter.data().desc,
          attributes: chapter.data().attributes,
        });
      });
      return chapterExists;
    })
    .catch((error) => {
      console.error(
        "Error reading document",
        `${collectionFrom}/`,
        JSON.stringify(error)
      );
    });

  const ref = firestore.collection(collectionTo).doc();
  let myId = ref.id;

  if (docData) {
    // document exists, create the new item
    chapterListLocal.forEach((chapter, index) => {
      let newname = "chapter-" + index;
      firestore
        .collection(collectionTo)
        .doc(myId)
        .set({ [newname]: chapter }, { merge: true })
        .catch((error) => {
          console.error(
            "Error creating document",
            `${collectionTo}`,
            JSON.stringify(error)
          );
        });
    });
    return true;
  }
  console.log(chapterListLocal.length);

  return false;
};

const FirebaseStorage = () => {
  return (
    <div>
      <Button onClick={() => copyDoc("scTemplate", "testCollection")}>
        Lagre dokument til Firestore
      </Button>
    </div>
  );
};

export default FirebaseStorage;
