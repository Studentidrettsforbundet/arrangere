import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "../../style/cards";
import { Link as RouterLink } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { errorState } from "../../stateManagement/errorHandling";
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

type Props = {
  collectionName: string;
};

export const RecivedAppCard = (props: Props) => {
  let [applicationIdList, setApplicationIdList] = useState<any>([]);
  //let [applicationData, setApplicationData] = useState<any>();

  const setCurrentApplicationIdState = useSetRecoilState(
    currentApplicationIdState
  );
  const setCurrentCollectionState = useSetRecoilState(currentCollectionState);
  // const isInitialMount = useRef(true);
  let docData = useRef();
  const classes = useStyles();
  var db = firebase.firestore();

  useEffect(() => {
    getSubmittedApplicationsID();
  }, [applicationIdList]);

  // useEffect(() => {
  //   if (isInitialMount.current) {
  //     getSubmittedApplicationsID();
  //     isInitialMount.current = false;
  //     setError("");
  //   }
  // });

  function getSubmittedApplicationsID() {
    db.collection(props.collectionName)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //console.log(`${doc.id}`);
          setApplicationIdList((applicationIdList: any) => [
            ...applicationIdList,
            `${doc.id}`,
          ]);
        });
      });
    return applicationIdList;
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

  // function showApplication(item: string) {
  //   console.log(item);
  //   db.collection(props.collectionName)
  //     .doc(item)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         //console.log("Document data:", doc.data());
  //         //docData = doc.data();
  //         //setApplicationData(JSON.stringify(doc.data()));
  //         setApplicationData(doc.data());
  //         //docData = doc.data();
  //       } else {
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  //   console.log(applicationData);
  //   return applicationData;
  // }

  return (
    <div style={{ display: "flex" }}>
      {applicationIdList.map((applicationId: any, i: any) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {applicationId}
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
              component={RouterLink}
              variant="outlined"
              size="small"
              onClick={() => {
                setCurrentApplicationIdState(applicationId);
                setCurrentCollectionState(props.collectionName);
              }}
              to={{
                pathname: "/application",
              }}
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
