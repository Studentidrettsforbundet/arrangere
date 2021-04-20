import { firestore } from "../../firebase";
import firebase from "firebase/app"

export async function copyDoc(template: string, currentUser: firebase.User | null ) {
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
        console.error(error);
      });

    const docToRef = firestore.collection(collectionTo).doc();
    let newDocId = docToRef.id;

    let tempOrganization = "";

    const organization = await firestore
      .collection("user")
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        const data = doc!.data();
        if (data != undefined) {
          tempOrganization = data.organization;
        }
        return tempOrganization;
      });

    await firestore
      .collection(collectionTo)
      .doc(newDocId)
      .set(
        {
          status: "in progress",
          user_id: [currentUser?.uid],
          user_email: [currentUser?.email],
          user_organization: tempOrganization,
          date: dateStr,
        },
        { merge: true }
      )
      .then(() => {
        console.log("user_id set in document to: " + currentUser?.uid);
      })
      .catch((error) => {
        console.error(
          "Error creating user_id field in",
          `${collectionTo}`,
          JSON.stringify(error)
        );
      });

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
            console.error(error);
          });
      });
    }
    return newDocId;
  }