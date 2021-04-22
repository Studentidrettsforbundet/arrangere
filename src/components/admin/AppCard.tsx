import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useStyles } from "../../style/cards";
import { Link as RouterLink } from "react-router-dom";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { documentState } from "../../stateManagement/attributesState";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { deleteApplication } from "../user/deleteApplication";
import {
  currentUserState,
  userRoleState,
} from "../../stateManagement/userAuth";

export default function AppCard(props: AppCardProps) {
  const setCurrentApplicationIdState = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);
  let [sport, setSport] = useState<any>([]);
  let [userEmail, setUserEmail] = useState<any>();
  let [status, setStatus] = useState<any>();
  let [organization, setOrganization] = useState<any>();
  let [date, setDate] = useState<Date>();
  const currentUser = useRecoilValue(currentUserState);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [userRole, setUserRole] = useRecoilState(userRoleState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteApplication = async () => {
    await deleteApplication(
      props.applicationId,
      props.collectionName,
      currentUser!.uid
    );
    handleClose();
    if (props.onChange != undefined) {
      props.onChange(true);
    }
  };

  function getStatus(collectionName: string, applicationId: string) {
    let tempStatus: string = "";
    firestore
      .collection(collectionName + "Applications")
      .doc(applicationId)
      .get()
      .then((doc) => {
        let docData = doc.data();
        if (docData !== undefined) {
          tempStatus = docData.status;
          setStatus(tempStatus);
        }
      });
    return status;
  }

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
            status: {status}
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

          {status === "in progress" || userRole === "admin" ? (
            <>
              <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Slett søknad
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">Slett søknad</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Er du sikker på at du vil slette søknaden?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary" autoFocus>
                    Gå tilbake
                  </Button>
                  <Button
                    onClick={() => handleDeleteApplication()}
                    color="primary"
                  >
                    Slett søknad
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            " "
          )}
        </CardActions>
      </Card>
    </div>
  );
}
