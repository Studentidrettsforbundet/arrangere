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
  }, [1]);

  function getSubmittedApplicationsID() {
    db.collection(props.collectionName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id}`);
          setApplicationList((applicationList: any) => [
            ...applicationList,
            `${doc.id}`,
          ]);
        });
      });
    return applicationList;
  }

  /** Må skrive kode for å hente ut brukernavn til bruker som har sendt inn søknaden, noe lignende
   * det under
   */
  // function getUsername(applicationList: any) {
  //   db.collection("user")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         //console.log(doc.data().applications);
  //         if (doc.data() != null) {
  //           console.log(doc.data().applications);

  //             if (doc.data().applications.contains(application)) {
  //               console.log(doc.data().email);
  //             } else {
  //               console.log("no match");
  //             }
  //           });
  //         } else {
  //           console.log("fail");
  //         }
  //       });
  //     });
  // }

  function showApplication(item: string) {
    console.log(item);
    db.collection(props.collectionName)
      .doc(item)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }

  return (
    <div style={{ display: "flex" }}>
      {applicationList.map((item: any, i: any) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              key="i"
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
            <Button
              variant="outlined"
              size="small"
              onClick={() => showApplication(item)}
            >
              Vis søknad
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default RecivedAppCard;
