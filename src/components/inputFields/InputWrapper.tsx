import React, { FC } from "react";
import { Typography } from "@material-ui/core";
import Date from "./Date";
import FileUpload from "./FileUpload";
import LongText from "./LongText";
import Number from "./Number";
import RadioButton from "./RadioButton";
import ShortText from "./ShortText";
import Time from "./Time";

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  fields: {
    type: string;
    desc: string;
  };
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

const InputWrapper: FC<InputWrapperProps> = ({ title, mainDesc, fields }) => {
  const Component = getComponentToBeRendered(fields.type);
  console.log(Component);
  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h6">{mainDesc}</Typography>
      <Component desc={fields.desc}></Component>
    </div>
  );
};

export default InputWrapper;
