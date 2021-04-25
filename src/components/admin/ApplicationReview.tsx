import { Box, Button, Typography } from "@material-ui/core";
import firebase from "firebase";
import { ReactElement, useEffect, useState } from "react";
import { RecoilValueReadOnly, useRecoilState, useSetRecoilState } from "recoil";
import {
  chapterCounterState,
  currentChapterState,
} from "../../stateManagement/applicationState";

import { RouteComponentProps } from "react-router-dom";
import { useStyles } from "../../style/chapters";
import ChapterButton from "../ChapterButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Skeleton } from "@material-ui/lab";

export const ApplicationReview = (
  props: RouteComponentProps<{}, {}, ApplicationStateProps>
) => {
  var db = firebase.firestore();
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const setCurrentChapterState = useSetRecoilState(currentChapterState);
  const [chapterCounter, setChapterCounter] = useRecoilState(
    chapterCounterState
  );

  useEffect(() => {
    retriveApplicationData(
      props.location.state.collection,
      props.location.state.applicationID
    );
  }, []);

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    if (currentCollection == "") {
      console.error("currentCollection is empty");
    } else {
      let chapterListLocal: Array<Chapter> = [];
      setLoading(true);
      await db
        .collection(currentCollection + "Applications")
        .doc(currentApplicationId)
        .get()
        .then((doc) => {
          const docData = doc?.data();
          if (!docData) {
            return null;
          } else {
            for (let chapter in docData) {
              if (
                chapter != "status" &&
                chapter != "user_id" &&
                chapter != "date" &&
                chapter != "user_email" &&
                chapter != "user_organization"
              ) {
                chapterListLocal.push({
                  chapterName: chapter,
                  title: docData[chapter].title,
                  desc: docData[chapter].desc,
                  attributes: docData[chapter].attributes,
                  priority: docData[chapter].priority,
                  buttons: docData[chapter].buttons,
                });
              }
            }
          }
        });
      setChapterList(chapterListLocal);
      setLoading(false);
    }
  }

  const renderChapters = (chapterList: Array<Chapter>) => {
    chapterList.sort((a: Chapter, b: Chapter) => a.priority - b.priority);
    const chapters: ReactElement[] = [];
    chapterList.map((chapter: Chapter, i) => {
      chapters.push(
        <div key={i}>
          <Typography style={{ color: "#00adee" }} variant="h4">
            {chapter.title}
          </Typography>
          <Typography gutterBottom={true} variant="h6">
            {chapter.desc}
          </Typography>
          {renderAttributes(chapter.attributes)}
        </div>
      );
    });
    setCurrentChapterState(chapterList[chapterCounter].title);
    return chapters;
  };

  const renderAttributes = (attributes: Array<Attribute>) => {
    let attributeList: Attribute[] = [];
    for (const attribute in attributes) {
      attributeList.push(attributes[attribute]);
    }

    attributeList.sort((a: Attribute, b: Attribute) => a.priority - b.priority);

    return (
      <div>
        {attributeList.map(
          (attribute: firebase.firestore.DocumentData, i: number) => {
            return (
              <div key={i}>
                <h2>{attribute.title}</h2>
                <h3>{attribute.desc}</h3>
                {renderInputFields(attribute.input_fields)}
              </div>
            );
          }
        )}
      </div>
    );
  };

  const renderInputFields = (inputFields: Array<InputField>) => {
    let inputFieldList: InputField[] = [];
    for (const inputField in inputFields) {
      inputFieldList.push(inputFields[inputField]);
    }

    inputFieldList.sort(
      (a: InputField, b: InputField) => a.priority - b.priority
    );

    return (
      <div>
        {inputFieldList.map(
          (inputField: firebase.firestore.DocumentData, i: number) => {
            let value = inputField.value;
            if (value != undefined) {
              if (inputField.value.includes("Filename")) {
                let urlAndName = inputField.value.split(".Filename:");
                value = (
                  <a href={urlAndName[0]} download>
                    {urlAndName[1]}
                  </a>
                );
              }
            }
            return (
              <Box pb={3} key={i}>
                <Typography variant="subtitle1">{inputField.desc}</Typography>
                <Box>
                  <Typography style={{ fontWeight: "bold" }} variant="body1">
                    Svar: <Typography>{value}</Typography>
                  </Typography>
                </Box>
              </Box>
            );
          }
        )}
      </div>
    );
  };

  const renderButtons = (chapterList: Array<Chapter>) => {
    const chapterButtons: ReactElement[] = [];
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
    }
  };

  const prevChapter = () => {
    if (chapterCounter > 0) {
      setChapterCounter(chapterCounter - 1);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
        <div>
          <div role="navigation" className="chapterButtons">
            <Box className={classes.nav}>{renderButtons(chapterList)}</Box>
          </div>
          <div role="main">
            <Box px={15} pb={6} pt={6}>
              {renderChapters(chapterList)[chapterCounter]}{" "}
              <Box display="flex" mt={3}>
                <Box width="100%">
                  {chapterCounter > 0 ? (
                    <Button
                      variant="contained"
                      className={classes.prevBtn}
                      onClick={prevChapter}
                      startIcon={<NavigateBeforeIcon />}
                    >
                      Forrige
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      className={classes.prevBtn}
                      onClick={prevChapter}
                      startIcon={<NavigateBeforeIcon />}
                    >
                      Forrige
                    </Button>
                  )}{" "}
                </Box>
                <Box flexShrink={0}>
                  {chapterCounter < chapterList.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={nextChapter}
                      endIcon={<NavigateNextIcon />}
                    >
                      Neste
                    </Button>
                  ) : (
                    <Button
                      disabled
                      variant="contained"
                      onClick={nextChapter}
                      endIcon={<NavigateNextIcon />}
                    >
                      Neste
                    </Button>
                  )}{" "}
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationReview;
