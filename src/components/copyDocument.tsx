import { firestore } from "../firebase";
import { Attribute } from "./Template";

export const copyDoc = async (
  collectionFrom: string,
  collectionTo: string
): Promise<boolean> => {
  // document reference
  const docRef = firestore.collection(collectionFrom);
  let chapterListLocal: Array<ChapterWithID> = [];
  let chapterExists: boolean = false;

  type ChapterWithID = {
    id: string;
    content: {
      title: string;
      desc: string;
      attributes: Array<Attribute>;
      priority: number;
    };
  };

  // copy the document
  const docData = await docRef
    .get()
    .then((doc) => {
      doc.forEach((chapter) => {
        if (chapter.exists) {
          chapterExists = true;
        }
        chapterListLocal.push({
          id: chapter.id,
          content: {
            title: chapter.data().title,
            desc: chapter.data().desc,
            attributes: chapter.data().attributes,
            priority: chapter.data().priority,
          },
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
    chapterListLocal.forEach((chapter) => {
      let chapterId = chapter.id;
      firestore
        .collection(collectionTo)
        .doc(myId)
        .set({ [chapterId]: chapter.content }, { merge: true })
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
  return false;
};
