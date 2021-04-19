import React, { useState } from "react";
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
import { deleteApplication } from "../user/deleteApplication";
import {
  currentUserState,
  userRoleState,
} from "../../stateManagement/userAuth";
import { firestore } from "../../firebase";

export default function AppCard(props: AppCardProps) {
  const setCurrentApplicationIdState = useSetRecoilState(documentState);
  const setCurrentCollectionState = useSetRecoilState(choosenApplicationState);
  const currentUser = useRecoilValue(currentUserState);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  let [status, setStatus] = useState<any>();
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
    props.onChange(true);
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
            bruker:
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
