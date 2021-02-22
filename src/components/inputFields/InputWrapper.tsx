import React, { FC } from "react";
import ShortText from "./ShortText";

type InputWrapperProps = {
  title: string;
  mainDesc: string;
};
const components = {
  short: ShortText,
};
const InputWrapper: FC<InputWrapperProps> = ({ title, mainDesc }) => {
  const CompName = ShortText;
  return (
    <div>
      <h3>{title}</h3>
      <p>{mainDesc}</p>
      <CompName desc="besk kort tekst" label="Kort tekst" />
    </div>
  );
};

export default InputWrapper;
