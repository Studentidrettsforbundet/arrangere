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

export type InputObject = {
  id: string;
  value: string;
};

const ShortText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);
  const selectedID = useRecoilValue(selectedAttributeIdState);
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  const [inputFieldList, setInputFieldList] = useRecoilState(
    inputFieldListState
  );

  const handleChange = (value: string) => {
    let inputFieldListLocal = inputFieldList;

    const found = inputFieldListLocal.some(
      (inputObject) => inputObject.id == id
    );

    if (!found || inputFieldListLocal.length == 0) {
      inputFieldListLocal.push({ id: id, value: value });
    }

    if (found) {
      inputFieldListLocal.map((inputObject) => {
        for (const key of Object.keys(inputObject)) {
          if (key == id) {
            inputObject[key] = value;
          }
        }
      });
    }

    setInputFieldList(inputFieldListLocal);
    console.log(inputFieldList);

    // inputFieldList.forEach((inputObject) => {
    //   console.log("innenfor", inputObject.id);
    //   if (inputObject.id == id) {
    //     inputObject.value = value;
    //   } else {
    //     console.log("inne i else");
    //     setInputFieldList((oldInputFieldList: Array<InputObject>) => [
    //       ...oldInputFieldList,
    //       {
    //         id: id,
    //         value: value,
    //       },
    //     ]);
    //   }
    // });
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

        // onFocus={() => setSelectedAttribute(id)}
        // onChange={(event) =>
        //   setAttribute({
        //     ...attribute,
        //     value: event.target.value,
        //     id: selectedID,
        //   })
        // }
      />
      {/* <Button onClick={() => saveInput(id, value, chapterName, docRef)}>
        Lagre felt
      </Button> */}
    </Box>
  );
};
export default ShortText;
