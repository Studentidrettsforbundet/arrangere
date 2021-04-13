import { Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { firestore } from "../../firebase";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";
import ChapterWrapper from "../ChapterWrapper";

export const UserApplication = () => {
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [currentApplicationId, setCurrentApplicationId] = useRecoilState(
    currentApplicationIdState
  );
  const [currentCollection, setCurrentCollection] = useRecoilState(
    currentCollectionState
  );

  useEffect(() => {
    retriveApplicationData(currentCollection, currentApplicationId);
  }, [currentApplicationId]);

  console.log(currentApplicationId);

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(currentCollection)
      .doc(currentApplicationId)
      .get()
      .then((doc) => {
        const docData = doc?.data();
        if (!docData) {
          console.log("no data here");
          return null;
        } else {
          for (let chapter in docData) {
            chapterListLocal.push({
              chapterName: chapter,
              title: docData[chapter].title,
              desc: docData[chapter].desc,
              attributes: docData[chapter].attributes,
              priority: docData[chapter].priority,
              buttons: docData[chapter].buttons,
            });
          }
          setChapterList(chapterListLocal);
        }
      });
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: any = [];
    chapterList.map((chapter: Chapter) => {
      chapters.push(
        <ChapterWrapper
          key={chapter.title}
          chapterName={chapter.chapterName}
          chapter={chapter}
        />
      );
    });
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    return chapters;
  };

  //   const renderInputFields = (chapterList: Array<Chapter>) => {
  //     let attributeList: Array<any> = [];
  //     let fieldPaths: Array<string> = [];
  //     chapterList.forEach((chapter: Chapter) => {
  //       attributeList.push(chapter.attributes);
  //       attributeList.forEach((attributes: any) => {
  //         for (const attribute in attributes) {
  //           let inputFields = attributes[attribute].input_fields;
  //           for (const inputField in inputFields) {
  //             let fieldPath = `${chapter.chapterName}.attributes.${attribute}.input_fields.${inputField}`;
  //             fieldPaths.push(fieldPath);
  //           }
  //         }
  //       });
  //     });
  //     return fieldPaths;
  //   };

  return (
    <Box px={15} pt={6}>
      {renderChapters(chapterList)}
    </Box>
  );
};
