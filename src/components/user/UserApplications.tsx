import { Divider, Typography, Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { currentUserState } from "../../stateManagement/userAuth";
import AppCard from "../admin/AppCard";

export const UserApplications = () => {
  const [submittedApplicationIDs, setSubmittedApplicationIDs] = useState<
    Array<any>
  >([]);
  const [inProgressApplicationIDs, setInProgressApplicationIDs] = useState<
    Array<any>
  >([]);
  const currentUser = useRecoilValue(currentUserState);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    getApplications();
    if (updateState) {
      getApplications();
      setUpdateState(false);
    }
  }, [updateState]);

  async function getApplications() {
    let submittedApplicationIDs: Array<any> = [];
    let inProgressApplicationIDs: Array<any> = [];
    if (currentUser != null) {
      const doc = await firestore.collection("user").doc(currentUser.uid).get();
      const docData: any = doc.data();
      for (const applicationID in docData.applications) {
        if (docData.applications[applicationID].id !== undefined) {
          if (docData.applications[applicationID].status === "submitted") {
            // Her er det sykt rart at jeg ikke kan sette det som et objekt som er gjort i else under..
            submittedApplicationIDs.push({
              id: docData.applications[applicationID].id,
              collection: docData.applications[applicationID].collection,
            });
          } else {
            inProgressApplicationIDs.push({
              id: docData.applications[applicationID].id,
              collection: docData.applications[applicationID].collection,
            });
          }
        }
      }
    }
    setSubmittedApplicationIDs(submittedApplicationIDs);
    setInProgressApplicationIDs(inProgressApplicationIDs);
  }

  const updateApplications = (isUpdate: boolean) => {
    setUpdateState(isUpdate);
  };

  const renderInProgressApplications = () => {
    return inProgressApplicationIDs?.map((applicationID: any, i: any) => (
      <AppCard
        key={i}
        to="/edit"
        applicationId={applicationID.id}
        collectionName={applicationID.collection}
        onChange={updateApplications}
      ></AppCard>
    ));
  };
  const renderSubmittedApplications = () => {
    return submittedApplicationIDs?.map((applicationID: any, i: any) => (
      <AppCard
        key={i}
        to="/application"
        applicationId={applicationID.id}
        collectionName={applicationID.collection}
        onChange={updateApplications}
      ></AppCard>
    ));
  };

  return (
    <div>
      <br></br>
      <Divider />
      <br></br>

      <Typography gutterBottom variant="h5" component="h2">
        Mine påbegynte søknader
      </Typography>

      <Box>
        <Grid container direction="row">
          {renderInProgressApplications()}
        </Grid>
      </Box>

      <Typography gutterBottom variant="h5" component="h2">
        Mine innsendte søknader
      </Typography>
      <Box>{renderSubmittedApplications()}</Box>
    </div>
  );
};
