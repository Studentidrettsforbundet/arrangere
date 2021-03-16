import { firestore } from "../firebase";
import { Attribute } from "./Template";

type ChapterWithID = {
  id: string;
  content: {
    title: string;
    desc: string;
    attributes: Array<Attribute>;
    priority: number;
  };
};

export const copyDoc = async (
  collectionFrom: string,
  collectionTo: string
): Promise<boolean> => {
  const docFromRef = firestore.collection(collectionFrom);
  let chapterListLocal: Array<ChapterWithID> = [];
  let chapterExists: boolean = false;

  const docData = await docFromRef
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

  const docToRef = firestore.collection(collectionTo).doc();
  let newDocId = docToRef.id;

  if (docData) {
    chapterListLocal.forEach((chapter) => {
      let chapterId = chapter.id;
      firestore
        .collection(collectionTo)
        .doc(newDocId)
        .set({ [chapterId]: chapter.content }, { merge: true })
        .then(() => console.log("New document created with id:", newDocId))
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
