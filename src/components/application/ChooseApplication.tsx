import { Grid, Typography } from "@material-ui/core/";
import { UserApplicationsOverview } from "../user/UserApplicationsOverview";
import { ApplicationType } from "./ApplicationType";
import Student_NM_logo from "../../images/student_NM.png";
import Studentleker_logo from "../../images/studentleker-1.png";
import Student_Cup_logo from "../../images/studentcup-1.png";

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
        <ApplicationType
          image={Student_NM_logo}
          title="Søknadskjema for Student-NM"
          to="/studentnm"
          collection="snm"
        />
        <ApplicationType
          image={Studentleker_logo}
          title="Søknadskjema for Studentleker"
          to="/studentleker"
          collection="sl"
        />
        <ApplicationType
          image={Student_Cup_logo}
          title="Søknadskjema for Student-Cup"
          to="/studentcup"
          collection="sc"
        />
      </Grid>
      <UserApplicationsOverview />
    </div>
  );
};
