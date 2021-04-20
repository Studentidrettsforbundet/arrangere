import { firestore } from "../../firebase";

export async function copyDoc(template: string) {
  let collectionFrom = template + "Template";
  let collectionTo = template + "Applications";
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
    chapterListLocal.forEach(async (chapter) => {
      let chapterId = chapter.id;
      await firestore
        .collection(collectionTo)
        .doc(newDocId)
        .set({ [chapterId]: chapter.content }, { merge: true })
        .then(() => {
          console.log(
            "New document created with id:" +
              newDocId +
              "\nIn collection " +
              template
          );
        })
        .catch((error) => {
          console.error(
            "Error reading document",
            `${collectionFrom}/`,
            JSON.stringify(error)
          );
        });
    });
    await firestore
      .collection(collectionTo)
      .doc(newDocId)
      .set({ status: "in progress" }, { merge: true })
      .then(() => {
        console.log(
          "Status field created in doc:" +
            newDocId +
            "\nIn collection " +
            template
        );
      })
      .catch((error) => {
        console.error(
          "Error creating document",
          `${collectionTo}`,
          JSON.stringify(error)
        );
      });
  }
  return newDocId;
}
