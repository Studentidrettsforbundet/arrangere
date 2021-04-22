import React, { FC, useState } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles2 } from "../../style/inputStyles";
import { useDocRef } from "../inputFields/saveInputFields";
import firebase from "firebase";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { generateComponents } from "../inputFields/getInputFieldComponent";

const AccordionComponent: FC<AccordionProps> = ({
  name,
  inputFields,
  priority,
  title,
  mainDesc,
  chapterName,
  onAccordionDelete,
}) => {
  const classes = useStyles2();
  const docRef = useDocRef();
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const [inputFieldObject, setInputFieldObject] = useRecoilState(
    inputFieldObjectState
  );
  let haveMainDesc = false;
  if (mainDesc != null) {
    haveMainDesc = true;
  }

  const deleteField = async (
    attName: string,
    docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
  ) => {
    setLoadingDelete(true);

    let fieldPath = `${chapterName}.attributes.${attName}`;
    await docRef
      .update({
        [fieldPath]: firebase.firestore.FieldValue.delete(),
      })
      .catch((error) => {
        console.log("Could not delete", error);
      });

    const inputFieldObjectLocal = Object.entries(inputFieldObject).reduce(
      (inputFieldObjectLocal, [key, val]) => {
        if (key.includes(attName)) {
          return inputFieldObjectLocal;
        }
        return {
          ...inputFieldObjectLocal,
          [key]: val,
        };
      },
      {}
    );
    setInputFieldObject(inputFieldObjectLocal);
    onAccordionDelete(true);
    setLoadingDelete(false);
  };

  return (
    <Grid key={name} container>
      <Grid item xs={11}>
        <Accordion className={classes.accordions} key={name}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
          >
            <Typography variant="h6">{title + " " + priority}</Typography>
          </AccordionSummary>

          {haveMainDesc ? (
            <Box px={2}>
              <Typography variant="subtitle1">{mainDesc}</Typography>
            </Box>
          ) : (
            ""
          )}

          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <div>{generateComponents(inputFields, chapterName)}</div>
            </div>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item align-self="center" xs={1}>
        {priority == 1 ? (
          <p></p>
        ) : (
          <Button
            className={classes.deleteButton}
            disabled={loadingDelete}
            variant="outlined"
            aria-label="slett"
            onClick={() => deleteField(name, docRef!)}
          >
            X
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default AccordionComponent;
