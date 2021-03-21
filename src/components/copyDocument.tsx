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
  // It is not necessary to explicitly state the type when the compiler can infer it
  let chapterExists = false;

  const docData = await docFromRef
    .get()
    .then((doc) => {
      doc.forEach((chapter) => {
        // Could this work as a simplification?
        chapterExists = chapter.exists;

        // Is it necessary to loop over all chapters and only get the relevant info? Does the benefit outweigh the cost?
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
      // do you only return this for the last chapter?
      return chapterExists;
    })
    .catch((error) => {
      // NB! Logging to the console is something you should be really careful with! You can leak sensitive data or
      // create security vulnerabilities when you use data directly from your code.
      console.error(
        "Error reading document",
        `${collectionFrom}/`,
        JSON.stringify(error)
      );
    });

  const docToRef = firestore.collection(collectionTo).doc();
  let newDocId = docToRef.id;

  // Consider the need for logging doc IDs to the console.
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
