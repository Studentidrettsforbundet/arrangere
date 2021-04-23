import { Grid, Typography } from "@material-ui/core/";
import { ApplicationCard } from "./ApplicationCard";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import { UserApplications } from "./user/UserApplications";

export const ChooseApplication = () => {
  return (
    <div role="main" style={{ padding: 40 }}>
      <Typography aria-label="Søknader" align="left" variant="h1"></Typography>
      <Typography gutterBottom variant="h5" component="h2">
        Opprett ny søknad
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        style={{ padding: 30 }}
      >
        <ApplicationCard
          image={Student_NM_logo}
          title="Søknadskjema for Student-NM"
          to="/studentnm"
          template="snm"
        />
        <ApplicationCard
          image={Studentleker_logo}
          title="Søknadskjema for Studentleker"
          to="/studentleker"
          template="sl"
        />
        <ApplicationCard
          image={Student_Cup_logo}
          title="Søknadskjema for Student-Cup"
          to="/studentcup"
          template="sc"
        />
      </Grid>
      <UserApplications />
    </div>
  );
};
