import { Box, Divider, Typography } from "@material-ui/core/";
import { ApplicationCard } from "./ApplicationCard";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import { firestore } from "../firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/userProfile";
import { useEffect, useState } from "react";

export const ChooseApplication = () => {
  const [submittedApplicationIDs, setSubmittedApplicationIDs] = useState<
    Array<string>
  >([]);
  const [inProgressApplicationIDs, setInProgressApplicationIDs] = useState<
    Array<string>
  >([]);
  const classes = useStyles();
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    getApplications();
  }, []);

  async function getApplications() {
    let submittedApplicationIDs: Array<string> = [];
    let inProgressApplicationIDs: Array<string> = [];
    if (currentUser != null) {
      const doc = await firestore.collection("user").doc(currentUser.uid).get();
      const docData: any = doc.data();
      for (const applicationID in docData.applications) {
        if (docData.applications[applicationID].status == "submitted") {
          submittedApplicationIDs.push(applicationID);
        } else {
          inProgressApplicationIDs.push(docData.applications[applicationID].id);
        }
      }
    }
    setSubmittedApplicationIDs(submittedApplicationIDs);
    setInProgressApplicationIDs(inProgressApplicationIDs);
  }

  const renderSubmittedApplications = (applicationsIDs: Array<string>) => {
    const applicationIDs = applicationsIDs.map(
      (applicationID: any, index: number) => (
        <Box>
          <Typography className={classes.content}>{applicationID}</Typography>
        </Box>
      )
    );
    return applicationsIDs;
  };

  const renderInProgressApplications = (applicationsIDs: Array<string>) => {
    const applicationIDs = applicationsIDs.map(
      (applicationID: any, index: number) => (
        <Box>
          <Typography className={classes.content}>{applicationID}</Typography>
        </Box>
      )
    );
    return applicationsIDs;
  };

  return (
    <div role="main" style={{ padding: 40 }}>
      <Typography gutterBottom align="center" variant="h1">
        Søknader
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Opprette ny søknad
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
      <Box>{renderInProgressApplications(inProgressApplicationIDs)}</Box>
      <Typography gutterBottom variant="h5" component="h2">
        Mine innsendte søknader
      </Typography>
      <Box>{renderSubmittedApplications(submittedApplicationIDs)}</Box>
    </div>
  );
};
