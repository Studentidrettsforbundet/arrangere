import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Alert } from "@material-ui/lab";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { documentState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { setStatusToSubmitted } from "./inputFields/setStatusToSubmitted";
import { useDocRef } from "./inputFields/saveInputFields";
import firebase from "firebase";

export const SubmitButton: FC<SubmitButtonProps> = ({ chapterName }) => {
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
    if ((await docRef!.get()).exists) {
      const doc = await firestore
        .collection("user")
        .doc(currentUserID!.uid)
        .get();
      const docData: firebase.firestore.DocumentData = doc.data()!;
      for (const application in docData.applications) {
        if (docData.applications[application].id === currentDocID) {
          setStatusToSubmitted(docRef!, userID, application);
          setSubmitted("submitted");
          history.push("/applications");
        }
      }
      setSubmitted("failed");
      handleClose();
    } else {
      setSubmitted("failed");
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
    <Box>
      {chapterName === "additional" ? (
        <Box flexShrink={0}>
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
      ) : (
        <Box></Box>
      )}
      {submitted === "failed" ? (
        <Alert severity="error">
          Something went wrong submitting the application!
        </Alert>
      ) : null}
    </Box>
  );
};
