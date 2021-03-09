import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import ChapterWrapper from "./ChapterWrapper";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { InputField } from "./inputFields/InputWrapper";
import Button from "@material-ui/core/Button";

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
  const choosenApplicationForm = useRecoilValue(choosenApplicationState);

  const [chapterCounter, setChapterCounter] = useState(2);

  useEffect(() => {
    generateApplicationForm();
  }, [choosenApplicationForm]);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(choosenApplicationForm)
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
            /* console.log("No such document!"); */
            throw new Error("No document.");
          }
        });
      })
      .catch((error) => {
        /* console.log("Error getting document: ", error); */
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

  const nextChapter = () => {
    console.log(chapterCounter);
    if (chapterCounter < chapterList.length - 1) {
      setChapterCounter(chapterCounter + 1);
    }
  };

  const prevChapter = () => {
    console.log(chapterCounter);
    if (chapterCounter > 0) {
      setChapterCounter(chapterCounter - 1);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Laster inn..</p>
      ) : (
        <div>
          {renderChapters(chapterList)[chapterCounter]}{" "}
          <Button variant="contained" onClick={nextChapter}>
            Forrige
          </Button>
          <Button variant="contained" onClick={prevChapter}>
            Neste
          </Button>
        </div>
      )}
    </div>
  );
};

export default Template;
