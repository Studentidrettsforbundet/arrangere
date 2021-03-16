import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import ChapterWrapper from "./ChapterWrapper";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { InputField } from "./inputFields/InputWrapper";
import Button from "@material-ui/core/Button";
import { useStyles } from "../style/chapters";
import ChapterButton from "./ChapterButton";

export type Chapter = {
  chapterName: string;
  title: string;
  desc: string;
  attributes: Array<Attribute>;
  priority: number;
  buttons: Array<string>;
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
  const classes = useStyles();
  const [chapterCounter, setChapterCounter] = useState(0);

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
    setChapterList(chapterListLocal);

    chapterListLocal = [];
    setLoading(false);
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

  const renderButtons = (chapterList: Array<Chapter>) => {
    const chapterButtons: any = [];
    chapterList.map((chapter: Chapter) => {
      chapterButtons.push(<ChapterButton title={chapter.title} />);
    });
    return chapterButtons;
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
          <div>
            <div>{renderButtons(chapterList)}</div>
            {renderChapters(chapterList)[chapterCounter]}{" "}
            <Button
              variant="contained"
              className={classes.prevBtn}
              onClick={prevChapter}
            >
              Forrige
            </Button>
            <Button variant="contained" onClick={nextChapter}>
              Neste
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
