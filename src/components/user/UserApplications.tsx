import { Divider, Typography, Box, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { firestore } from "../../firebase";
import { currentUserState } from "../../stateManagement/userAuth";
import AppCard from "../admin/AppCard";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import firebase from "firebase";

type ApplicationID = {
  id: string;
  collection: string;
};

export const UserApplications = () => {
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
    if (currentUser != null) {
      const doc = await firestore.collection("user").doc(currentUser.uid).get();
      const docData: firebase.firestore.DocumentData = doc.data()!;
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
    }
    setSubmittedApplicationIDs(submittedApplicationIDs);
    setInProgressApplicationIDs(inProgressApplicationIDs);
  }

  const updateApplications = (isUpdate: boolean) => {
    setUpdateState(isUpdate);
  };

  const renderInProgressApplications = () => {
    return inProgressApplicationIDs?.map(
      (applicationID: ApplicationID, i: number) => (
        <AppCard
          key={i}
          to="/edit"
          applicationId={applicationID.id}
          collectionName={applicationID.collection}
          onChange={updateApplications}
        ></AppCard>
      )
    );
  };

  const renderSubmittedApplications = () => {
    return submittedApplicationIDs?.map(
      (applicationID: ApplicationID, i: number) => (
        <AppCard
          key={i}
          to="/application"
          applicationId={applicationID.id}
          collectionName={applicationID.collection}
          onChange={updateApplications}
        ></AppCard>
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
        <p>Du har ingen påbegynte søknader.</p>
      ) : (
        <Box>{renderInProgressApplications()}</Box>
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
        <p>Du har ingen innsendte søknader.</p>
      ) : (
        <Box>{renderSubmittedApplications()}</Box>
      )}
    </div>
  );
};
