import { Divider, Typography } from "@material-ui/core/";
import { ApplicationCard } from "./ApplicationCard";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import SubmittedApplications from "./SubmittedApplications";

export const ChooseApplication = () => {
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
      {/* <SubmittedApplications></SubmittedApplications> */}
    </div>
  );
};
