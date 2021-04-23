import { firestore } from "../../firebase";

export async function getChapterList(collection: string) {
  let chapterListLocal: Array<Chapter> = [];
  await firestore
    .collection(collection + "Template")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((chapter) => {
        if (chapter.exists) {
          chapterListLocal.push({
            chapterName: chapter.id,
            buttons: chapter.data().buttons,
            title: chapter.data().title,
            desc: chapter.data().desc,
            attributes: chapter.data().attributes,
            priority: chapter.data().priority,
          });
        } else {
          console.log("No such document!");
          throw new Error("No document.");
        }
      });
    })
    .catch((error) => {
      console.log("Error getting document: ", error);
    });

  return chapterListLocal;
}
