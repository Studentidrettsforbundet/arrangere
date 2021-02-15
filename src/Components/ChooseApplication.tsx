import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Student_NM_logo from "./../images/student_NM.png";
import Studentleker_logo from "./../images/studentleker-1.png";
import Student_Cup_logo from "./../images/studentcup-1.png";
import Divider from "@material-ui/core/Divider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StudentCupForm from "./StudentCupForm";
import StudentNMForm from "./StudentNMForm";
import StudentlekerForm from "./StudentlekerForm";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: 30,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  media: {
    height: 30,
  },
});

export default function ChooseApplication() {
  const classes = useStyles();

  return (
    <div style={{ padding: 40 }}>
      <Router>
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
          {/* Card for Student-NM */}
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Student_NM_logo}
                title="studentnm"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Søknadskjema for Student-NM
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <Link to="/student-NM">Ny søknad</Link>
              </Button>
            </CardActions>
          </Card>

          {/* Card for studentleker */}
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Studentleker_logo}
                title="studentleker"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Søknadskjema for Studentleker
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <Link to="/studentleker">Ny søknad</Link>
              </Button>
            </CardActions>
          </Card>

          {/* Card for student-Cup */}
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={Student_Cup_logo}
                title="studentleker"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Søknadskjema for Student-Cup
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <Link to="/student-Cup">Ny søknad</Link>
              </Button>
            </CardActions>
          </Card>
        </div>
        <br></br>
        <Divider />
        <br></br>
        <Typography gutterBottom variant="h5" component="h2">
          <br></br>
          Mine påbegynte søknader
        </Typography>

        <Switch>
          <Route path="/student-NM">
            <StudentNMForm />
          </Route>
          <Route path="/studentleker">
            <StudentlekerForm />
          </Route>
          <Route path="/student-Cup">
            <StudentCupForm />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
