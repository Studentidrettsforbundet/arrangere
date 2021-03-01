import React from "react";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { ApplicationCard } from "./ApplicationCard";

export default function ChooseApplication() {
  return (
    <div style={{ padding: 40 }}>
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
          text="Søknadskjema for student-NM"
          to="/studentnm"
        />
        <ApplicationCard
          image={Studentleker_logo}
          text="Søknadskjema for studentleker"
          to="/studentleker"
        />
        <ApplicationCard
          image={Student_Cup_logo}
          text="Søknadskjema for student-Cup"
          to="/studentcup"
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
}
