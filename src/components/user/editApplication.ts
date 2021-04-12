// import { Box } from "@material-ui/core";
// import { useEffect, useState } from "react";
// import { useRecoilValue } from "recoil";
// import { firestore } from "../../firebase";
// import {
//   currentApplicationIdState,
//   currentCollectionState,
// } from "../../stateManagement/choosenApplication";
// import ChapterWrapper from "../ChapterWrapper";
// import Template from "../Template";

// export async function retriveApplicationData(
//   collection: string,
//   applicationId: string
// ) {
//   let chapterListLocal: Array<Chapter> = [];

//   if (collection == "") {
//     collection = "snmApplications";
//     console.log("currentCollection is empty");
//   } else {
//     await firestore
//       .collection("snmApplications")
//       .doc("MXJy3SLev82ZKLbvDs8t")
//       .get()
//       .then((doc) => {
//         const docData = doc?.data();
//         if (!docData) {
//           console.log("no data here");
//           return null;
//         } else {
//           for (let chapter in docData) {
//             chapterListLocal.push({
//               chapterName: chapter,
//               title: docData[chapter].title,
//               desc: docData[chapter].desc,
//               attributes: docData[chapter].attributes,
//               priority: docData[chapter].priority,
//               buttons: docData[chapter].buttons,
//             });
//           }
//           // setChapterList(chapterListLocal);
//         }
//       });
//   }
//   console.log(chapterListLocal);
//   return chapterListLocal;
// }

// export const renderChapters = (chapterList: Array<Chapter>) => {
//   const chapters: any = [];
//   chapterList.map((chapter: Chapter) => {
//     chapters.push(
//       <ChapterWrapper
//         key={chapter.title}
//         chapterName={chapter.chapterName}
//         chapter={chapter}
//       />
//     );
//   });
//   chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
//   return chapters;
// };

// export async function getInputField(
//   collection: string,
//   applicationID: string,
//   fieldPath: string
// ) {
//   let value = "";
//   await firestore
//     .collection(collection)
//     .doc(applicationID)
//     .get()
//     .then((res) => {
//       value = res.get(fieldPath);
//       return value;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
//   return value;
// }

// const renderInputFields = (chapterList: Array<Chapter>) => {
//   let attributeList: Array<any> = [];
//   let fieldPaths: Array<string> = [];
//   chapterList.forEach((chapter: Chapter) => {
//     attributeList.push(chapter.attributes);
//     //let chapterName = chapter;
//     attributeList.forEach((attributes: any) => {
//       for (const attribute in attributes) {
//         let inputFields = attributes[attribute].input_fields;
//         for (const inputField in inputFields) {
//           // console.log(inputField);
//           let fieldPath = `${chapter.chapterName}.attributes.${attribute}.input_fields.${inputField}`;
//           //console.log(fieldPath);
//           fieldPaths.push(fieldPath);
//         }
//         // console.log(attributes[attribute].input_fields);
//         // Har fått ut fieldpath (må fikses på med input slik at den ikke er hardkodet)

//         // const inputField = getInputField(fieldPath);
//         // console.log(inputField);
//       }
//       //console.log(attributes);
//     });
//   });
//   //console.log(fieldPaths);
//   return fieldPaths;
// };

export {};
