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
import {
  currentApplicationIdState,
  currentCollectionState,
} from "../../stateManagement/choosenApplication";

export const ReceivedAppCard = (props: ReceivedApplicationProps) => {
  let [applicationIdList, setApplicationIdList] = useState<any>([]);
  const setCurrentApplicationIdState = useSetRecoilState(
    currentApplicationIdState
  );
  const setCurrentCollectionState = useSetRecoilState(currentCollectionState);
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
          //console.log(`${doc.id}`);
          setApplicationIdList((applicationIdList: any) => [
            ...applicationIdList,
            `${doc.id}`,
          ]);
        });
      });
    return applicationIdList;
  }

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

export default ReceivedAppCard;
