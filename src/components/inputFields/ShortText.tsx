import { FC, useState } from "react";
import { TextField, Typography, Box, Button } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
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
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);
  const selectedID = useRecoilValue(selectedAttributeIdState);
  const docID = useRecoilValue(documentState);
  const collection = useRecoilValue(choosenApplicationState);
  const docRef = useDocRef();

  const [value, setValue] = useState("");

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        onChange={(event) => {
          setValue(event.target.value);
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
      <Button onClick={() => saveInput(id, value, chapterName, docRef)}>
        Lagre felt
      </Button>
    </Box>
  );
};
export default ShortText;
