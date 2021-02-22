import React, { FC } from "react";
import ShortText from "./ShortText";

type InputWrapperProps = {
  title: string;
  mainDesc: string;
};

const InputWrapper: FC<InputWrapperProps> = ({ title, mainDesc }) => {
  return (
    <div className="">
      <h3>{title}</h3>
      <p> {mainDesc}</p>
      <ShortText desc="feltbeskrivelse" label="label"></ShortText>
    </div>
  );
};

export default InputWrapper;
