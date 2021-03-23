import { FC, useState } from "react";
import { TextField, Typography, Box, Button } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  inputFieldListState,
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
  const [inputFieldList, setInputFieldList] = useRecoilState(
    inputFieldListState
  );

  const handleChange = (value: string) => {
    let inputFieldListLocal = Object.assign({}, inputFieldList);
    Object.assign(inputFieldListLocal, { [id]: value });
    setInputFieldList(inputFieldListLocal);
    console.log(inputFieldList);
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
