import React, { FC } from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@material-ui/core";
import Date from "./Date";
import FileUpload from "./FileUpload";
import LongText from "./LongText";
import Number from "./Number";
import RadioButton from "./RadioButton";
import ShortText from "./ShortText";
import Time from "./Time";
import { copyAttribute } from "./inputButtonFunctions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const componentList = [
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

  componentList.map((component) => {
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
  let attributebutton;
  let isCollapse = false;
  let haveMainDesc = false;
  if (mainDesc != null) {
    haveMainDesc = true;
  }
  if (buttons != null) {
    buttons.forEach((button) => {
      if (button.includes(attributeName)) {
        attributebutton = (
          <Box m={0.5} mb={1}>
            <Button
              onClick={() =>
                copyAttribute(
                  "scTemplate",
                  "testCollection",
                  attributeName,
                  chapterName
                )
              }
              variant="outlined"
            >
              Legg til felt
            </Button>
          </Box>
        );
        isCollapse = true;
      }
    });
  }
  return (
    <div style={{ width: "100%" }}>
      {isCollapse ? (
        <div>
          <Box pb={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">{title}</Typography>
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
                  {generateComponents(inputFields, chapterName)}
                </div>
              </AccordionDetails>
            </Accordion>
          </Box>
          {attributebutton}
        </div>
      ) : (
        <div>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="subtitle1">{mainDesc}</Typography>
          <div>{generateComponents(inputFields, chapterName)}</div>
        </div>
      )}
    </div>
  );
};

export default InputWrapper;
