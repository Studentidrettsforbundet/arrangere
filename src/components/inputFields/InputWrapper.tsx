import React, { FC } from "react";
import ShortText from "./ShortText";
import LongText from "./LongText";
import RadioButton from "./RadioButton";

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

  return ComponentName;
};

const InputWrapper: FC<InputWrapperProps> = ({ title, mainDesc, fields }) => {
  const Component = getComponentToBeRendered(fields.type);
  console.log(Component);
  return (
    <div>
      <h3>{title}</h3>
      <p>{mainDesc}</p>
      <Component desc={fields.desc}></Component>
    </div>
  );
};

export default InputWrapper;
