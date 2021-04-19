import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useSetRecoilState } from "recoil";
import { useStyles } from "../../style/cards";
import { Link as RouterLink } from "react-router-dom";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { documentState } from "../../stateManagement/attributesState";
import { firestore } from "../../firebase";
import { useState } from "react";

type Props = {
  applicationId: string;
  collectionName: string;
  to: string;
};

export default function AppCard(props: Props) {
  const setCurrentApplicationIdState = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);
  let [sport, setSport] = useState<any>([]);
  let [userId, setUserId] = useState<any>([]);
  let [status, setStatus] = useState<any>();
  const classes = useStyles();

  function getSport(collectionName: string, applicationId: string) {
    let tempsport: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          if (docData.general != undefined) {
            tempsport = docData!.general.attributes.general.input_fields.input3
              .value;
            setSport(tempsport);
          }
        }
      });

    return sport;
  }

  function getUserId(collectionName: string, applicationId: string) {
    let userEmail: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          userEmail = docData.userEmail;
          if (userEmail != undefined) {
            setUserId(userEmail[0]);
          }
        }
      });
    return userId;
  }

  function getStatus(collectionName: string, applicationId: string) {
    let tempStatus: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          tempStatus = docData.status;
          setStatus(tempStatus);
          console.log(tempStatus);
        }
      });
    return status;
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.applicationId}
          </Typography>

          <Typography variant="body2" component="p">
            type: {props.collectionName}
          </Typography>
          <Typography variant="body2" component="p">
            sport: {getSport(props.collectionName, props.applicationId)}
          </Typography>
          <Typography variant="body2" component="p">
            bruker: {getUserId(props.collectionName, props.applicationId)}
          </Typography>
          <Typography variant="body2" component="p">
            status: {getStatus(props.collectionName, props.applicationId)}
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
              setCurrentApplicationIdState(props.applicationId);
              setCurrentCollectionState(props.collectionName);
            }}
            to={{
              pathname: props.to,
              state: {
                applicationID: props.applicationId,
                collection: props.collectionName,
              },
            }}
          >
            Vis søknad
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
