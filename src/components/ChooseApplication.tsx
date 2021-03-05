import React from "react";
import { Divider, Typography } from "@material-ui/core/";
import { ApplicationCard } from "./ApplicationCard";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import { ApplicationForm } from "./ApplicationForm";

export const ChooseApplication = () => {
  return (
    <div style={{ padding: 40 }}>
      <Typography gutterBottom variant="h5" component="h2">
        Opprette ny søknad
      </Typography>
      {/* <Route
        exact
        path="/application"
        render={(props) => (
          <ApplicationForm {...props} title=`Props through render` />
        )}
      /> */}
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
          to="/application"
        />
        <ApplicationCard
          image={Studentleker_logo}
          title="Søknadskjema for studentleker"
          to="/application"
        />
        <ApplicationCard
          image={Student_Cup_logo}
          title="Søknadskjema for student-Cup"
          to="/application"
        />
      </div>

      <br></br>
      <Divider />
      <br></br>

      <Typography gutterBottom variant="h5" component="h2">
        Mine påbegynte søknader
      </Typography>
    </div>
  );
};
