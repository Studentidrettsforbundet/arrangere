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
import { useEffect, useState } from "react";

type Props = {
  applicationId: string;
  collectionName: string;
  to: string;
};

export default function AppCard(props: Props) {
  const setCurrentApplicationIdState = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);
  let [sport, setSport] = useState<any>([]);
  let [userEmail, setUserEmail] = useState<any>();
  let [status, setStatus] = useState<any>();
  let [organization, setOrganization] = useState<any>();
  let [date, setDate] = useState<Date>();
  const classes = useStyles();

  useEffect(() => {
    getCardInfo(props.collectionName, props.applicationId);
  }, []);

  function getCardInfo(collectionName: string, applicationId: string) {
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData != undefined) {
          setStatus(docData.status);
          setOrganization(docData.user_organization);
          setUserEmail(docData.user_email);
          setDate(docData.date);
          if (docData.general != undefined) {
            setSport(
              docData!.general.attributes.general.input_fields.input3.value
            );
          }
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
            sport: {sport}
          </Typography>
          <Typography variant="body2" component="p">
            bruker:
            {userEmail}
          </Typography>
          <Typography variant="body2" component="p">
            status:
            {status}
          </Typography>
          <Typography variant="body2" component="p">
            dato: {date}
          </Typography>
          <Typography variant="body2" component="p">
            organisasjon:
            {organization}
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
