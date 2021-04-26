import { Box, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase";
import { useRecoilValue } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { saveInput, useDocRef } from "../application/saveInputFields";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { FC } from "react";

export const SaveButton: FC<saveButtonProps> = ({ setErrorStatus }) => {
  const docRef = useDocRef();

  const inputFieldObject = useRecoilValue(inputFieldObjectState);

  const saveAndAlertUser = async (
    docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  ) => {
    await saveInput(docRef, inputFieldObject).then((value) => {
      if (!value) {
        setErrorStatus({ status: "error", text: "Noe gikk galt. Prøv igjen." });
      } else {
        setErrorStatus({ status: "success", text: "Lagret!" });
      }
    });
  };

  return (
    <Box mt={3}>
      <Button
        variant="contained"
        onClick={() => saveAndAlertUser(docRef!)}
        startIcon={<SaveOutlinedIcon />}
      >
        Lagre
      </Button>
    </Box>
  );
};
