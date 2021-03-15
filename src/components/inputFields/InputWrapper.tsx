import React, { FC } from "react";
import { Typography, Button } from "@material-ui/core";
import Date from "./Date";
import FileUpload from "./FileUpload";
import LongText from "./LongText";
import Number from "./Number";
import RadioButton from "./RadioButton";
import ShortText from "./ShortText";
import Time from "./Time";
import { copyAttribute } from "./inputButtonFunctions";

export type InputField = {
  type: string;
  desc: string;
  id: string;
};

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  button: string;
  key: string;
  attributeName: string;
  inputFields: Array<InputField>;
  chapterName: string;
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
  let ComponentName: React.FC<{ desc: string; id: string }>;
  ComponentName = defaultComponent;

  componentList.map((component) => {
    if (component.type == type) {
      ComponentName = component.ComponentName;
    }
  });

  return ComponentName;
};

const generateComponents = (inputFields: Array<InputField>) => {
  const components: any = [];
  inputFields.map((inputField: any, i) => {
    const Component = getComponentToBeRendered(inputField.type);
    components.push(
      <Component key={i} desc={inputField.desc} id={inputField.id}></Component>
    );
  });
  return components;
};

/*
let url = window.location.href;
var str_sub = url.substr(url.lastIndexOf("/") + 1);
*/

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  mainDesc,
  inputFields,
  button,
  attributeName,
  chapterName,
}) => {
  let attributebutton;
  if (button != null) {
    attributebutton = (
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
        {attributeName}
      </Button>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1">{mainDesc}</Typography>
      <div>{generateComponents(inputFields)}</div>
      {attributebutton}
    </div>
  );
};

export default InputWrapper;
