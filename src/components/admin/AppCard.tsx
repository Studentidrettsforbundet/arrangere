import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useStyles } from "../../style/cards";
import { Link as RouterLink } from "react-router-dom";
import { applicationTypeState } from "../../stateManagement/applicationState";
import { applicationIDState } from "../../stateManagement/attributesState";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
import { deleteApplication } from "../user/deleteApplication";
import DoneIcon from "@material-ui/icons/Done";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
  currentUserState,
  userRoleState,
} from "../../stateManagement/userAuth";

export default function AppCard(props: AppCardProps) {
  const setCurrentApplicationIdState = useSetRecoilState(applicationIDState);
  const setCurrentCollectionState = useSetRecoilState(applicationTypeState);
  let [sport, setSport] = useState<string[]>([]);
  let [userEmail, setUserEmail] = useState<string>();
  let [status, setStatus] = useState<any>();
  let [organization, setOrganization] = useState<string>();
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

  function getTitle() {
    let title;
    if (props.collectionName === "sl" || sport == [""]) {
      title = organization;
    } else {
      title = sport + ", " + organization;
    }
    return title;
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          title={getTitle()}
          subheader={date}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.collectionName}
            </Avatar>
          }
        ></CardHeader>
        <CardContent className={classes.content}>
          <Typography
            variant="body2"
            className={classes.pos}
            component="p"
            color="primary"
          >
            {userEmail}
          </Typography>
          {status === "submitted" ? (
            <>
              <Chip
                className={classes.submittedColor}
                label="innsendt"
                size="small"
                icon={<DoneIcon className={classes.submittedColor} />}
              />
            </>
          ) : (
            <Chip
              className={classes.inProgressColor}
              label="påbegynt"
              size="small"
            />
          )}
        </CardContent>
        <CardActions className={classes.actions}>
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
            Åpne
          </Button>

          {status === "in progress" || userRole === "admin" ? (
            <>
              <Button variant="outlined" size="small" onClick={handleClickOpen}>
                Slett
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
