import { FC, useState } from "react";
import { TextField, Typography, Box, Button } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  inputFieldObjectState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { firestore } from "../../firebase";
import { documentState } from "../ApplicationCard";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { saveInput, useDocRef } from "./saveInputFields";

export type InputFieldProps = {
  desc: string;
  id: string;
  chapterName: string;
};

const ShortText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const handleChange = (value: string) => {
    let inputFieldObjectLocal = Object.assign({}, inputFieldObject);
    Object.assign(inputFieldObjectLocal, { [id]: value });
    Object.assign(inputFieldObjectLocal, { chapterName: chapterName });
    setInputFieldList(inputFieldObjectLocal);
    console.log(inputFieldObject);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default ShortText;
