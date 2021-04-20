import { Box, Button, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../stateManagement/attributesState";
import { saveInput, useDocRef } from "./inputFields/saveInputFields";
import InputWrapper from "./inputFields/InputWrapper";
import { is_numeric } from "./utils";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import { useStyles } from "../style/chapters";
import { SubmitButton } from "./SubmitButton";

const ChapterWrapper = (props: ChapterWithName) => {
  let chapter = props.chapter;
  let chapterName = props.chapterName;
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attributeList, setAttributeList] = useState<AttributeObject[]>([]);
  const docRef = useDocRef();
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

  let descContainer = (
    <Typography gutterBottom={true} variant="h6">
      {chapter.desc}
    </Typography>
  );

  const saveAndAlertUser = async (docRef: any) => {
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
    <div style={{ width: "100%" }}>
      <Typography className={classes.heading} variant="h1">
        {chapter.title}
      </Typography>
      {chapter.desc != "" ? <div>{descContainer} </div> : <p></p>}
      <div>
        {renderInputFields(attributeList, chapter.buttons, chapterName)}
      </div>
      <Box display="flex">
        <Box width="100%" mt={3} mb={3}>
          <Box>
            <Button
              variant="contained"
              onClick={() => saveAndAlertUser(docRef)}
              startIcon={<SaveOutlinedIcon />}
            >
              Lagre
            </Button>
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
        <SubmitButton chapterName={chapterName} />
      </Box>
    </div>
  );
};
export default ChapterWrapper;
