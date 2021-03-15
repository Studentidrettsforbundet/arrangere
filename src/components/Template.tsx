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
  priority: number;
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

  const [chapterCounter, setChapterCounter] = useState(0);

  useEffect(() => {
    generateApplicationForm();
  }, [choosenApplicationForm]);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(choosenApplicationForm + "Template")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            chapterListLocal.push({
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
    setChapterList(chapterListLocal);
    chapterListLocal = [];
    setLoading(false);
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    const chapters: any = [];
    chapterList.map((chapter: Chapter) => {
      chapters.push(<ChapterWrapper key={chapter.title} chapter={chapter} />);
    });
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    return chapters;
  };

  const nextChapter = () => {
    if (chapterCounter < chapterList.length - 1) {
      setChapterCounter(chapterCounter + 1);
    }
  };

  const prevChapter = () => {
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
          <Button variant="contained" onClick={prevChapter}>
            Forrige
          </Button>
          <Button variant="contained" onClick={nextChapter}>
            Neste
          </Button>
        </div>
      )}
    </div>
  );
};

export default Template;
