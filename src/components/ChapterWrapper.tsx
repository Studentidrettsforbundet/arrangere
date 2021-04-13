import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import InputWrapper from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  documentState,
  inputFieldObjectState,
} from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import { setStatusToSubmitted } from "./inputFields/confirmSubmittedApplication";
import { firestore } from "../firebase";
import { useHistory } from "react-router-dom";
import { is_numeric } from "./utils";
import { currentApplicationIdState } from "../stateManagement/choosenApplication";

type ChapterProps = {
  chapter: Chapter;
  chapterName: string;
};

type AttributeObject = {
  name: string;
  attribute: Attribute[];
};

const ChapterWrapper = (props: ChapterProps) => {
  let chapter = props.chapter;
  let chapterName = props.chapterName;
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState("in progress");
  const [open, setOpen] = React.useState(false);
  const currentDocID = useRecoilValue(currentApplicationIdState);
  const currentUserID = useRecoilValue(currentUserState);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const docRef = useDocRef();
  const history = useHistory();
  const [inputFieldObject, setInputFieldObject] = useRecoilState(
    inputFieldObjectState
  );

  const classes = useStyles();

  useEffect(() => {
    attributesToList(chapter.attributes);
    setInputFieldObject({});
  }, [loading]);

  const attributesToList = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: any = [];
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string, index: number) => {
        attributeListLocal.push({
          name: Object.keys(attributes)[index],
          attribute: attributes[attribute],
        });
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    } else {
      console.log("No attributes!");
    }
    setAttributeList(attributeListLocal);
    setLoading(false);
  };

  const renderInputFields = (
    attributeList: Array<AttributeObject>,
    buttons: Array<string>,
    chapterName: string
  ) => {
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    let inputNr: string = "";
    attributeList.map((attributeObject: any) => {
      Object.keys(attributeObject.attribute.input_fields).forEach(
        (inputField: string) => {
          inputField.split("").forEach((character: any) => {
            if (is_numeric(character)) {
              inputNr += character;
            }
          });
          inputFields.push({
            type: attributeObject.attribute.input_fields[inputField].type,
            desc: attributeObject.attribute.input_fields[inputField].desc,
            priority:
              attributeObject.attribute.input_fields[inputField].priority,
            id: attributeObject.name + "-" + inputNr,
          });
          inputNr = "";
        }
      );
      inputFields.sort((a: any, b: any) => a.priority - b.priority);
      inputWrappers.push(
        <InputWrapper
          chapterName={chapterName}
          attributeName={attributeObject.name}
          buttons={buttons}
          key={attributeObject.name}
          title={attributeObject.attribute.title}
          mainDesc={attributeObject.attribute.desc}
          inputFields={inputFields}
          priority={attributeObject.attribute.priority}
        />
      );
      inputFields = [];
    });
    return inputWrappers;
  };

  async function submitApplication(docRef: any, userID: string) {
    if ((await docRef!.get()).exists) {
      const doc = await firestore
        .collection("user")
        .doc(currentUserID!.uid)
        .get();

      const docData: any = doc.data();
      for (const application in docData.applications) {
        if (docData.applications[application].id === currentDocID) {
          setStatusToSubmitted(docRef, userID, application);
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

  let descContainer = (
    <Typography gutterBottom={true} variant="h6">
      {chapter.desc}
    </Typography>
  );

  return (
    <div style={{ width: "100%" }}>
      <Typography style={{ color: "#00adee" }} variant="h4">
        {chapter.title}
      </Typography>
      {chapter.desc != "" ? <div>{descContainer}</div> : <p></p>}
      <div>
        {renderInputFields(attributeList, chapter.buttons, chapterName)}
      </div>
      <Box display="flex">
        <Box width="100%" mt={3} mb={3}>
          <Button
            variant="contained"
            onClick={() => saveInput(docRef, inputFieldObject)}
          >
            Lagre
          </Button>
        </Box>
        {chapterName === "additional" ? (
          <Box flexShrink={0} mt={3} mb={3}>
            <Button variant="contained" onClick={handleClickOpen}>
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
                  onClick={() => submitApplication(docRef, currentUserID!.uid)}
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
      </Box>
      {submitted === "failed" ? (
        <Alert severity="error">
          Something went wrong submitting the application!
        </Alert>
      ) : (
        <Box></Box>
      )}
    </div>
  );
};

export default ChapterWrapper;
