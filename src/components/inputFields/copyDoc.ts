import { firestore } from "../../firebase";

export async function copyDoc(template: string, currentUser: any) {
  let collectionFrom = template + "Template";
  let collectionTo = template + "Applications";
  const docFromRef = firestore.collection(collectionFrom);
  let chapterListLocal: Array<ChapterWithID> = [];
  let chapterExists: boolean = false;

  const date: Date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateStr = day + "/" + month + "/" + year;

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
            buttons: chapter.data().buttons,
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

    let organization = "";
    await firestore
      .collection("user")
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        const data = doc!.data();
        if (data != undefined) {
          organization = data.organization;
        }
        return organization;
      });

    await firestore
      .collection(collectionTo)
      .doc(newDocId)
      .set(
        {
          status: "in progress",
          user_id: [currentUser?.uid],
          user_email: [currentUser?.email],
          user_organization: organization,
          date: dateStr,
        },
        { merge: true }
      )
      .then(() => {
        console.log(
          "Status field created in doc:" +
            newDocId +
            "\nIn collection " +
            template
        );
      });
  }
  return newDocId;
}
