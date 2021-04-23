import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Alert } from "@material-ui/lab";
import React, { FC, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { documentState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { setStatusToSubmitted } from "./inputFields/setStatusToSubmitted";
import { useDocRef } from "./inputFields/saveInputFields";
import firebase from "firebase";

export const SubmitButton: FC<SubmitButtonProps> = ({
  chapterName,
  setErrorStatus,
}) => {
  const [open, setOpen] = useState(false);
  const currentDocID = useRecoilValue(documentState);
  const currentUserID = useRecoilValue(currentUserState);
  const [submitted, setSubmitted] = useState("in progress");

  const history = useHistory();
  const docRef = useDocRef();

  async function submitApplication(
    docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>,
    userID: string
  ) {
    let status = true;
    if ((await docRef!.get()).exists) {
      const doc = await firestore
        .collection("user")
        .doc(currentUserID!.uid)
        .get();
      const docData: firebase.firestore.DocumentData = doc.data()!;
      if (docData != undefined) {
        for (const application in docData.applications) {
          if (docData.applications[application].id === currentDocID) {
            setStatusToSubmitted(docRef!, userID, application);
            history.push("/applications");
          }
        }
      } else {
        status = false;
      }
    } else {
      status = false;
    }
    if (!status) {
      setErrorStatus({
        status: "error",
        text: "Noe gikk galt. Sjekk internettilkoblingen din og prøv på nytt",
      });
      handleClose();
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item>
      {chapterName === "additional" ? (
        <Box mt={3} flexShrink={0} style={{ float: "right" }}>
          <Button
            variant="contained"
            onClick={handleClickOpen}
            endIcon={<SendIcon />}
          >
            Send inn
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Send inn søknad</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Er du sikker på at du vil sende inn søknaden? Har du husket å
                lagre?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Gå tilbake
              </Button>
              <Button
                onClick={() => submitApplication(docRef!, currentUserID!.uid)}
                color="primary"
              >
                Send inn
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      ) : null}
    </Grid>
  );
};
