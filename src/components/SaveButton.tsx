import { Box, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";

export const SaveButton = () => {
  const docRef = useDocRef();
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const inputFieldObject = useRecoilValue(inputFieldObjectState);

  const saveAndAlertUser = async (
    docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  ) => {
    try {
      try {
        saveInput(docRef, inputFieldObject);
      } catch (error) {
        setShowError(true);
      }
      setShowAlert(true);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        onClick={() => saveAndAlertUser(docRef!)}
        startIcon={<SaveOutlinedIcon />}
      >
        Lagre
      </Button>

      <Box mt={2}>
        {showAlert ? (
          <Alert
            severity="success"
            onClose={() => {
              setShowAlert(false);
            }}
          >
            {"Lagret!"}
          </Alert>
        ) : null}
        {showError ? (
          <Alert
            severity="error"
            onClose={() => {
              setShowError(false);
            }}
          >
            {"Ups, det skjedde en feil. Ikke lagret!"}
          </Alert>
        ) : null}
      </Box>
    </Box>
  );
};
