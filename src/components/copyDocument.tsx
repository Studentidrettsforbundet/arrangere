import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { currentUserState } from "../stateManagement/userAuth";
import { Attribute } from "./Template";

export type ChapterWithID = {
  id: string;
  content: {
    title: string;
    desc: string;
    attributes: Array<Attribute>;
    priority: number;
  };
};

// export async function copyDoc(collectionFrom: string, collectionTo: string) {
//   const docFromRef = firestore.collection(collectionFrom);
//   let chapterListLocal: Array<ChapterWithID> = [];
//   let chapterExists: boolean = false;

//   const docData = await docFromRef
//     .get()
//     .then((doc) => {
//       doc.forEach((chapter) => {
//         if (chapter.exists) {
//           chapterExists = true;
//         }
//         chapterListLocal.push({
//           id: chapter.id,
//           content: {
//             title: chapter.data().title,
//             desc: chapter.data().desc,
//             attributes: chapter.data().attributes,
//             priority: chapter.data().priority,
//           },
//         });
//       });
//       return chapterExists;
//     })
//     .catch((error) => {
//       console.error(
//         "Error reading document",
//         `${collectionFrom}/`,
//         JSON.stringify(error)
//       );
//     });

//   const docToRef = await firestore.collection(collectionTo).doc();
//   let newDocId = docToRef.id;

//   if (docData) {
//     chapterListLocal.forEach((chapter) => {
//       let chapterId = chapter.id;
//       firestore
//         .collection(collectionTo)
//         .doc(newDocId)
//         .set({ [chapterId]: chapter.content }, { merge: true })
//         .then(() => {
//           console.log("New document created with id:", newDocId);
//         })
//         .catch((error) => {
//           console.error(
//             "Error creating document",
//             `${collectionTo}`,
//             JSON.stringify(error)
//           );
//         });
//     });
//     return newDocId;
//   }
//   return null;
// }

// export const copyDoc = async (
//   collectionFrom: string,
//   collectionTo: string
// ): Promise<boolean> => {
//   const docFromRef = firestore.collection(collectionFrom);
//   let chapterListLocal: Array<ChapterWithID> = [];
//   let chapterExists: boolean = false;

//   const docData = await docFromRef
//     .get()
//     .then((doc) => {
//       doc.forEach((chapter) => {
//         if (chapter.exists) {
//           chapterExists = true;
//         }
//         chapterListLocal.push({
//           id: chapter.id,
//           content: {
//             title: chapter.data().title,
//             desc: chapter.data().desc,
//             attributes: chapter.data().attributes,
//             priority: chapter.data().priority,
//           },
//         });
//       });
//       return chapterExists;
//     })
//     .catch((error) => {
//       console.error(
//         "Error reading document",
//         `${collectionFrom}/`,
//         JSON.stringify(error)
//       );
//     });

//   const docToRef = await firestore.collection(collectionTo).doc();
//   let newDocId = docToRef.id;

//   if (docData) {
//     chapterListLocal.forEach((chapter) => {
//       let chapterId = chapter.id;
//       await firestore
//         .collection(collectionTo)
//         .doc(newDocId)
//         .set({ [chapterId]: chapter.content }, { merge: true })
//         .then(() => {
//           console.log("New document created with id:", newDocId);
//         })
//         .catch((error) => {
//           console.error(
//             "Error creating document",
//             `${collectionTo}`,
//             JSON.stringify(error)
//           );
//         });
//     });
//     setNewDocID(newDocId);
//     return true;
//   } else {
//     return false;
//   }
// };

function getNumberOfApplications(userID: string) {}

const AddDocToUser = (docID: string) => {
  const user = useRecoilValue(currentUserState);

  firestore
    .collection("user")
    .doc(user!.uid)
    .update({
      "applications.application": docID,
    })
    .then(() => console.log("Field updated!"))
    .catch((error) => console.log(error));
};

export default AddDocToUser;

//export default copyDoc;
