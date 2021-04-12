import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core/";
import { ApplicationCard } from "./ApplicationCard";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import { firestore } from "../firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/userProfile";
import { useEffect, useRef, useState } from "react";
import AppCard from "./admin/AppCard";
import { Link as RouterLink } from "react-router-dom";

export const ChooseApplication = () => {
  const [submittedApplicationIDs, setSubmittedApplicationIDs] = useState<
    Array<any>
  >([]);
  const [inProgressApplicationIDs, setInProgressApplicationIDs] = useState<
    Array<any>
  >([]);
  const classes = useStyles();
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    getApplications();
  }, []);

  async function getApplications() {
    let submittedApplicationIDs: Array<any> = [];
    let inProgressApplicationIDs: Array<any> = [];
    if (currentUser != null) {
      const doc = await firestore.collection("user").doc(currentUser.uid).get();
      const docData: any = doc.data();
      for (const applicationID in docData.applications) {
        if (docData.applications[applicationID].id != undefined) {
          if (docData.applications[applicationID].status == "submitted") {
            // Her er det sykt rart at jeg ikke kan sette det som et objekt som er gjort i else under..
            submittedApplicationIDs.push([
              docData.applications[applicationID].id,
              docData.applications[applicationID].collection,
            ]);
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

  const renderSubmittedApplications = () => {
    return submittedApplicationIDs?.map((applicationID: any, i: any) => (
      <AppCard
        to="/application"
        applicationId={applicationID[0]}
        collectionName={applicationID[1]}
      ></AppCard>
    ));
  };

  const renderInProgressApplications = () => {
    return inProgressApplicationIDs?.map((applicationID: any, i: any) => (
      <AppCard
        to="/edit"
        applicationId={applicationID.id}
        collectionName={applicationID.collection}
      ></AppCard>
    ));
  };

  return (
    <div role="main" style={{ padding: 40 }}>
      <Typography gutterBottom align="center" variant="h1">
        Søknader
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Opprette ny søknad!
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <ApplicationCard
          image={Student_NM_logo}
          title="Søknadskjema for student-NM"
          to="/studentnm"
          template="snm"
        />
        <ApplicationCard
          image={Studentleker_logo}
          title="Søknadskjema for studentleker"
          to="/studentleker"
          template="sl"
        />
        <ApplicationCard
          image={Student_Cup_logo}
          title="Søknadskjema for student-Cup"
          to="/studentcup"
          template="sc"
        />
      </div>

      <br></br>
      <Divider />
      <br></br>

      <Typography gutterBottom variant="h5" component="h2">
        Mine påbegynte søknader
      </Typography>
      <Box>{renderInProgressApplications()}</Box>
      <Typography gutterBottom variant="h5" component="h2">
        Mine innsendte søknader
      </Typography>
      <Box>{renderSubmittedApplications()}</Box>
    </div>
  );
};
