import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
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

export const ReceivedAppCard = (props: Props) => {
  let [applicationIdList, setApplicationIdList] = useState<any>([]);
  const setCurrentApplicationIdState = useSetRecoilState(
    currentApplicationIdState
  );
  const setCurrentCollectionState = useSetRecoilState(currentCollectionState);
  const classes = useStyles();
  var db = firebase.firestore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubmittedApplicationsID();
  }, []);

  async function getSubmittedApplicationsID() {
    setLoading(true);
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
        setLoading(false);
      });

    return applicationIdList;
  }

  return (
    <div>
      {loading ? (
        <Box>
          <Typography variant="subtitle2">Laster inn..</Typography>
          <Skeleton />
        </Box>
      ) : (
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
      )}
    </div>
  );
};

export default ReceivedAppCard;
