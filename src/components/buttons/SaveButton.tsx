import { FC } from "react";
import { useRecoilValue } from "recoil";
import firebase from "firebase";
import { Box, Button } from "@material-ui/core";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { saveInput, useDocRef } from "../application/saveInputFields";

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
