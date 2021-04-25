import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { firestore } from "../../firebase";
import { chapterCounterState } from "../../stateManagement/applicationState";
import Application from "../Application";

import { RouteComponentProps } from 'react-router-dom';

export const UserApplication = (props: RouteComponentProps<{}, {}, ApplicationStateProps>) => {
  //foreslår å endre dette navnet til UserApplicationReview
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);
  const setChapterCounter = useSetRecoilState(chapterCounterState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    retriveApplicationData(
      props.location.state.collection,
      props.location.state.applicationID
    );
  }, [props.location.state.applicationID]);

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
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
                buttons: docData[chapter].buttons,
                title: docData[chapter].title,
                desc: docData[chapter].desc,
                attributes: docData[chapter].attributes,
                priority: docData[chapter].priority,
              });
            }
          }
        }
      });
    setChapterList(chapterListLocal);
    setLoading(false);
  }

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
        <Application chapterList={chapterList}></Application>
      )}
    </div>
  );
};
