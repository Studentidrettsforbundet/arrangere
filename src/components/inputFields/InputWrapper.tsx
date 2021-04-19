import React, { FC } from "react";
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
import { copyAttribute, getListOfAttributes } from "./inputButtonFunctions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useDocRef } from "./saveInputFields";
import { useRecoilState, useRecoilValue } from "recoil";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { useState } from "react";
import { useEffect } from "react";
import firebase from "firebase";
import { useStyles2 } from "./inputStyles";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { useRef } from "react";

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
        key={i + "" + inputField.id}
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
  const classes = useStyles2();

  const docRef = useDocRef();
  const [newFields, setNewFields] = useState<any>([]);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const chosenApplication = useRecoilValue(choosenApplicationState);
  const [inputFieldObject, setInputFieldObject] = useRecoilState(
    inputFieldObjectState
  );

  let attributebutton;
  let isCollapse = false;
  let haveMainDesc = false;
  if (mainDesc != null) {
    haveMainDesc = true;
  }

  useEffect(() => {
    if (isCollapse) {
      renderAccordions();
    }
  }, []);
  let renderOnce = false;

  if (buttons != null) {
    buttons.forEach((button) => {
      let buttonName = button.split(" ");

      if (buttonName[1] == attributeName) {
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
      }
      let attributeNameWithoutNumber = attributeName.substr(
        0,
        attributeName.length - 1
      );
      if (buttonName[1] == attributeNameWithoutNumber) {
        renderOnce = true;
      }
    });
  }

  const deleteField = async (attName: string, docRef: any) => {
    setLoadingDelete(true);

    let fieldPath = `${chapterName}.attributes.${attName}`;
    await docRef
      .update({
        [fieldPath]: firebase.firestore.FieldValue.delete(),
      })
      .then(console.log("deleted" + attName))
      .catch((error: any) => {
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
    renderAccordions();
    setLoadingDelete(false);
  };

  const createAccordion = (
    name: string,
    inputFields: Array<InputField>,
    priority: number
  ) => {
    let accordion = (
      <Grid key={name} container>
        <Grid item xs={10}>
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
        <Grid item align-self="center" xs={2}>
          {priority == 1 ? (
            <p></p>
          ) : (
            <Button
              className={classes.deleteButton}
              disabled={loadingDelete}
              variant="outlined"
              onClick={() => deleteField(name, docRef)}
            >
              x
            </Button>
          )}
        </Grid>
      </Grid>
    );

    return accordion;
  };

  const renderAccordions = async () => {
    let accordions: any = [];
    await getListOfAttributes(docRef, attributeName, chapterName).then(
      (attributeObjectList) => {
        attributeObjectList.forEach((attribute) => {
          let accordion;
          Object.entries(attribute).forEach(([key, value]) => {
            accordion = createAccordion(
              key,
              value.input_fields,
              value.priority
            );
          });
          accordions.push(accordion);
        });
        accordions.sort((a: any, b: any) => a.key - b.key);
        setNewFields(accordions);
      }
    );
  };

  const copyField = async (
    docRef: any,
    attributeName: string,
    chapterName: string
  ) => {
    let attributeList = await copyAttribute(
      chosenApplication,
      docRef,
      attributeName,
      chapterName
    );
    var accordion;

    Object.entries(attributeList[0]).forEach(([key, value]) => {
      accordion = createAccordion(key, value.input_fields, value.priority);
    });

    var accordions = [...newFields];
    accordions.push(accordion);
    setNewFields(accordions);
  };

  return (
    <div style={{ width: "100%" }}>
      {isCollapse ? (
        <div>
          <Box pb={2}>
            <div>{newFields}</div>
            <p>
              Husk å klikk på lagre om du har gjort noen endringer i en{" "}
              {title.toLowerCase()}, før du sletter en annen{" "}
              {title.toLowerCase()}
            </p>
          </Box>
          {attributebutton}
        </div>
      ) : (
        <div>
          {renderOnce ? (
            <div></div>
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
        /*
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
        */
      )}
    </div>
  );
};

export default InputWrapper;
