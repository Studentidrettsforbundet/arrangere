import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chapterCounterState,
  applicationTypeState,
} from "../stateManagement/applicationState";
import Application from "./Application";
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { getChapterList } from "./inputFields/retriveTemplate";
import { applicationIDState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { addDocToUser } from "./inputFields/addDocToUser";
import { copyDoc } from "./inputFields/copyDoc";
import DisplayError from "./DisplayError";

import { RouteComponentProps } from 'react-router-dom';

const Template = (props: RouteComponentProps<{}, {}, ApplicationStateProps>) => {
  const isInitialMount = useRef(true);
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const setChapterCounter = useSetRecoilState(chapterCounterState);
  const currentUser = useRecoilValue(currentUserState);
  const setDocID = useSetRecoilState(applicationIDState);
  const setCurrentCollectionState = useSetRecoilState(applicationTypeState);
  const [error, setError] = useState({ status: "success", text: "Success" });
  const [showModal, setShowModal] = useState(false);

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

  const toShowModal = (show: boolean) => {
    setShowModal(show);
  };
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
      {showModal ? (
        <DisplayError error={error} showModal={toShowModal}></DisplayError>
      ) : null}
    </div>
  );
};

export default Template;
