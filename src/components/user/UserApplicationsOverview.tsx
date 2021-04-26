import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import firebase from "firebase";
import { Divider, Typography, Box, Grid } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import { firestore } from "../../firebase";
import { currentUserState } from "../../stateManagement/userAuth";

import ApplicationCard from "../application/ApplicationCard";

export const UserApplicationsOverview = () => {
  const [submittedApplicationIDs, setSubmittedApplicationIDs] = useState<
    Array<ApplicationID>
  >([]);
  const [inProgressApplicationIDs, setInProgressApplicationIDs] = useState<
    Array<ApplicationID>
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
    let submittedApplicationIDs: Array<ApplicationID> = [];
    let inProgressApplicationIDs: Array<ApplicationID> = [];
    if (currentUser !== null) {
      const doc = await firestore.collection("user").doc(currentUser.uid).get();
      const docData: firebase.firestore.DocumentData = doc.data()!;
      if (docData !== undefined) {
        for (const applicationID in docData.applications) {
          if (docData.applications[applicationID].id !== undefined) {
            if (docData.applications[applicationID].status === "submitted") {
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
        setSubmittedApplicationIDs(submittedApplicationIDs);
        setInProgressApplicationIDs(inProgressApplicationIDs);
      }
    }
  }

  const updateApplications = (isUpdate: boolean) => {
    setUpdateState(isUpdate);
  };

  const renderInProgressApplications = () => {
    return inProgressApplicationIDs?.map(
      (applicationID: ApplicationID, i: number) => (
        <ApplicationCard
          key={i}
          to="/edit"
          applicationId={applicationID.id}
          collectionName={applicationID.collection}
          onChange={updateApplications}
        ></ApplicationCard>
      )
    );
  };

  const renderSubmittedApplications = () => {
    return submittedApplicationIDs?.map(
      (applicationID: ApplicationID, i: number) => (
        <ApplicationCard
          key={i}
          to="/application"
          applicationId={applicationID.id}
          collectionName={applicationID.collection}
          onChange={updateApplications}
        ></ApplicationCard>
      )
    );
  };

  return (
    <div>
      <br></br>
      <Divider />
      <br></br>

      <Typography gutterBottom variant="h5" component="h2">
        <span style={{ paddingRight: "0.3em" }}>
          <EditOutlinedIcon />
        </span>
        Mine påbegynte søknader
      </Typography>
      {inProgressApplicationIDs.length === 0 ? (
        <p style={{ color: "#707070" }}>Du har ingen påbegynte søknader.</p>
      ) : (
        <Box>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderInProgressApplications()}
          </Grid>
        </Box>
      )}

      <br></br>

      <Typography gutterBottom variant="h5" component="h2">
        <span
          style={{
            paddingRight: "0.3em",
          }}
        >
          <AssignmentTurnedInOutlinedIcon />
        </span>
        Mine innsendte søknader
      </Typography>
      {submittedApplicationIDs.length === 0 ? (
        <p style={{ color: "#707070" }}>Du har ingen innsendte søknader.</p>
      ) : (
        <Box>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {renderSubmittedApplications()}
          </Grid>
        </Box>
      )}
    </div>
  );
};
