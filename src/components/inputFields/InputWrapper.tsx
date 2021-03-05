import React, { FC } from "react";
import ShortText from "./ShortText";
import LongText from "./LongText";
import RadioButton from "./RadioButton";
import Date from "./Date";
import { Typography } from "@material-ui/core";
import Time from "./Time";
import FileUpload from "./FileUpload";
import Number from "./Number";

export type InputField = {
  type: string;
  desc: string;
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
  let ComponentName: React.FC<{ desc: string }>;
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
    components.push(<Component key={i} desc={inputField.desc}></Component>);
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
