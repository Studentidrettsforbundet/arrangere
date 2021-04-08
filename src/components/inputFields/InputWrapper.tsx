import React, { Component, FC } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
} from "@material-ui/core";
import Date from "./Date";
import FileUpload from "./FileUpload";
import LongText from "./LongText";
import Number from "./Number";
import RadioButton from "./RadioButton";
import ShortText from "./ShortText";
import Time from "./Time";
import { copyAttribute, createNewAttribute } from "./inputButtonFunctions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDocRef } from "./saveInputFields";
import { useRecoilValue } from "recoil";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { ReactComponent } from "*.svg";
import { useState } from "react";
import { useEffect } from "react";
import app, { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import firebase from "firebase";

export type InputField = {
  type: string;
  desc: string;
  priority: number;
  id: string;
};

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  key: string;
  inputFields: Array<InputField>;
  buttons: Array<string>;
  chapterName: string;
  attributeName: string;
  priority: number;
};

export const componentList = [
  { type: "short text", ComponentName: ShortText },
  { type: "long text", ComponentName: LongText },
  { type: "radio button", ComponentName: RadioButton },
  { type: "date", ComponentName: Date },
  { type: "time", ComponentName: Time },
  { type: "file", ComponentName: FileUpload },
  { type: "number", ComponentName: Number },
];

// Default component if nothing is selected
const defaultComponent = () => {
  return <div></div>;
};

const getComponentToBeRendered = (type: string) => {
  let ComponentName: React.FC<{
    desc: string;
    id: string;
    chapterName: string;
  }>;
  ComponentName = defaultComponent;

  componentList.forEach((component) => {
    if (component.type === type) {
      ComponentName = component.ComponentName;
    }
  });

  return ComponentName;
};

const generateComponents = (
  inputFields: Array<InputField>,
  chapterName: string
) => {
  const components: any = [];
  inputFields.map((inputField: any, i) => {
    const Component = getComponentToBeRendered(inputField.type);
    components.push(
      <Component
        key={i}
        desc={inputField.desc}
        id={inputField.id}
        chapterName={chapterName}
      ></Component>
    );
  });
  return components;
};

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  mainDesc,
  inputFields,
  buttons,
  chapterName,
  attributeName,
}) => {
  const docRef = useDocRef();
  const [newFields, setNewFields] = useState([]);
  const chosenApplication = useRecoilValue(choosenApplicationState);
  const docID = useRecoilValue(documentState);

  let attributebutton;
  let isCollapse = false;
  let haveMainDesc = false;
  if (mainDesc != null) {
    haveMainDesc = true;
  }

  const deleteField = (attName: string, docRef: any) => {
    let fieldPath = `${chapterName}.attributes.${attName}`;
    var removeAttribute = docRef.update({
      [fieldPath]: firebase.firestore.FieldValue.delete(),
    });
    if (removeAttribute) {
      createFields();
    }
  };

  const createFields = async () => {
    const accordions: any = [];
    let attributeObject: { [key: string]: Array<InputField> } = {};
    attributeObject = await createNewAttribute(
      docRef,
      attributeName,
      chapterName,
      inputFields
    );

    Object.entries(attributeObject).forEach(
      ([attributeName, inputFieldsArray], i) => {
        accordions.push(
          <Accordion key={attributeName}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{i + 1 + ". " + title}</Typography>
                <Button
                  variant="outlined"
                  onClick={() => deleteField(attributeName, docRef)}
                >
                  X
                </Button>
              </Grid>
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
                <div>{generateComponents(inputFieldsArray, chapterName)}</div>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      }
    );
    setNewFields(accordions);
  };

  const copyField = (
    docRef: any,
    attributeName: string,
    chapterName: string
  ) => {
    copyAttribute(chosenApplication, docRef, attributeName, chapterName).then(
      () => {
        createFields();
      }
    );
  };

  if (buttons != null) {
    buttons.forEach((button) => {
      if (button.includes(attributeName)) {
        attributebutton = (
          <Box m={0.5} mb={1}>
            <Button
              onClick={() => copyField(docRef, attributeName, chapterName)}
              variant="outlined"
            >
              Legg til {title}
            </Button>
          </Box>
        );
        isCollapse = true;
        createFields();
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      {isCollapse ? (
        <div>
          <Box pb={2}>
            <div>{newFields}</div>
          </Box>
          {attributebutton}
        </div>
      ) : (
        <div>
          <Typography variant="h6">{title}</Typography>
          {haveMainDesc ? (
            <Box>
              <Typography variant="subtitle1">{mainDesc}</Typography>
            </Box>
          ) : (
            ""
          )}
          <div>{generateComponents(inputFields, chapterName)}</div>
        </div>
      )}
    </div>
  );
};

export default InputWrapper;
