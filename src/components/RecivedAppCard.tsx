import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { useStyles } from "../style/cards";

type Props = {
  collectionName: string;
};

export const RecivedAppCard = (props: Props) => {
  let [applicationList, setApplicationList] = useState<any>([]);
  const classes = useStyles();
  var db = firebase.firestore();

  useEffect(() => {
    getSubmittedApplicationsID();
  }, []);

  function getSubmittedApplicationsID() {
    db.collection(props.collectionName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id}`);
          setApplicationList((applicationList: any) => [
            ...applicationList,
            `${doc.id}`,
          ]);
        });
      });
  }

  /** Må skrive kode for å hente ut brukernavn til bruker som har sendt inn søknaden */
  // function getUsername() {
  //   db.collection("user")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         console.log(`${doc.id}`);
  //         setApplicationList((applicationList: any) => [
  //           ...applicationList,
  //           `${doc.id}`,
  //         ]);
  //       });
  //     });
  // }

  return (
    <div style={{ display: "flex" }}>
      {applicationList.map((item: any, i: any) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {item}
            </Typography>

            <Typography variant="body2" component="p">
              bruker:
            </Typography>
            <Typography variant="body2" component="p">
              dato:
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" size="small">
              Vis søknad
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default RecivedAppCard;
