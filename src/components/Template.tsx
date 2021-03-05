import React, { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { InputField } from "./inputFields/InputWrapper";
import ChapterWrapper from "./ChapterWrapper";

export type Chapter = {
  title: string;
  desc: string;
  attributes: Array<Attribute>;
};

export type Attribute = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
};

const Template = () => {
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);

  useEffect(() => {
    generateApplicationForm();
  }, []);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection("snTemplateNestedInput")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            chapterListLocal.push({
              title: chapter.data().title,
              desc: chapter.data().desc,
              attributes: chapter.data().attributes,
            });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            throw new Error("no doc");
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    setChapterList(chapterListLocal);
    chapterListLocal = [];
    setLoading(false);
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: any = [];
    chapterList.map((chapter: Chapter) => {
      chapters.push(<ChapterWrapper key={chapter.title} chapter={chapter} />);
    });
    return chapters;
  };

  return (
    <div>
      {loading ? <p>Laster inn</p> : <div>{renderChapters(chapterList)}</div>}
    </div>
  );
};

export default Template;
