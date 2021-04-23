import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chapterCounterState,
  choosenApplicationState,
} from "../stateManagement/choosenApplication";
import Application from "./Application";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { getChapterList } from "./inputFields/retriveTemplate";
import { documentState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { addDocToUser } from "./inputFields/addDocToUser";
import { copyDoc } from "./inputFields/copyDoc";

const Template = (props: any) => {
  const isInitialMount = useRef(true);
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const setChapterCounter = useSetRecoilState(chapterCounterState);
  const currentUser = useRecoilValue(currentUserState);
  const setDocID = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    generateApplicationForm();
  }, []);

  async function generateApplicationForm() {
    setLoading(true);
    const newDocId = await copyDoc(
      props.location.state.collection,
      currentUser
    );
    setDocID(newDocId);
    addDocToUser(currentUser!.uid, newDocId, props.location.state.collection);
    setCurrentCollectionState(props.location.state.collection);
    const chapterListLocal = await getChapterList(
      props.location.state.collection
    );
    setChapterList(chapterListLocal);
    setLoading(false);
  }

  return (
    <div style={{ width: "100%" }}>
      {!loading ? (
        <Application chapterList={chapterList}></Application>
      ) : (
        <Box p={10}>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      )}
    </div>
  );
};

export default Template;
