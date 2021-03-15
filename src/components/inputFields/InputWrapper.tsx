import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import Date from "./Date";
import FileUpload from "./FileUpload";
import LongText from "./LongText";
import Number from "./Number";
import RadioButton from "./RadioButton";
import ShortText from "./ShortText";
import Time from "./Time";

export type InputField = {
  type: string;
  desc: string;
  id: string;
};

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  inputFields: Array<InputField>;
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

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  mainDesc,
  inputFields,
}) => {
  return (
    <div>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="subtitle1">{mainDesc}</Typography>
      <div>{generateComponents(inputFields)}</div>
    </div>
  );
};

export default InputWrapper;
