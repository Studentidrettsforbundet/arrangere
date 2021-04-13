import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import ChapterWrapper from "./ChapterWrapper";
import {
  chapterCounterState,
  currentChapterState,
} from "../stateManagement/choosenApplication";
import { Box, Button } from "@material-ui/core/";
import { useStyles } from "../style/chapters";
import ChapterButton from "./ChapterButton";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import { inputFieldObjectState } from "../stateManagement/attributesState";

type TemplateProps = {
  choosenApplicationForm: string;
};

const Template = (props: TemplateProps) => {
  const classes = useStyles();
  const isInitialMount = useRef(true);
  const docRef = useDocRef();
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  //const choosenApplicationForm = useRecoilValue(choosenApplicationState);
  const setCurrentChapterState = useSetRecoilState(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );
  const inputFieldObject = useRecoilValue(inputFieldObjectState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    generateApplicationForm();
  }, [props.choosenApplicationForm]);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(props.choosenApplicationForm + "Template")
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
    setCurrentChapterState(chapterList[chapterCounter].title);
    return chapters;
  };

  const renderButtons = (chapterList: Array<Chapter>) => {
    const chapterButtons: any = [];
    chapterList.map((chapter: Chapter) => {
      chapterButtons.push(
        <ChapterButton
          key={chapter.priority}
          title={chapter.title}
          priority={chapter.priority}
        />
      );
    });
    return chapterButtons;
  };

  const nextChapter = () => {
    if (chapterCounter < chapterList.length - 1) {
      setChapterCounter(chapterCounter + 1);
      saveInput(docRef, inputFieldObject);
    }
  };

  const prevChapter = () => {
    if (chapterCounter > 0) {
      setChapterCounter(chapterCounter - 1);
      saveInput(docRef, inputFieldObject);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Laster inn..</p>
      ) : (
        <div>
          <div role="navigation" className="chapterButtons">
            <Box className={classes.nav}>{renderButtons(chapterList)}</Box>
          </div>
          <div role="main">
            <Box px={15} pt={6}>
              {renderChapters(chapterList)[chapterCounter]}{" "}
              <Box display="flex" mt={3}>
                <Box width="100%">
                  <Button
                    variant="contained"
                    className={classes.prevBtn}
                    onClick={prevChapter}
                  >
                    Forrige
                  </Button>
                </Box>
                <Box flexShrink={0}>
                  <Button variant="contained" onClick={nextChapter}>
                    Neste
                  </Button>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
