import React, { FC } from "react";
import ShortText from "./ShortText";
import LongText from "./LongText";
import RadioButton from "./RadioButton";
import Date from "./Date";
import { Typography } from "@material-ui/core";

type InputWrapperProps = {
  title: string;
  mainDesc: string;
  fields: {
    type: string;
    desc: string;
  };
};

const defaultComponent = () => {
  return <div></div>;
};

const getComponentToBeRendered = (type: string) => {
  let ComponentName: React.FC<{ desc: string }>;
  ComponentName = defaultComponent;

  if (type == "short text") {
    ComponentName = ShortText;
  }
  if (type == "long text") {
    ComponentName = LongText;
  }
  if (type == "radio button") {
    ComponentName = RadioButton;
  }
  if (type == "date") {
    ComponentName = Date;
  }

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
