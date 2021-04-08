import { FC, useEffect, useRef, useState } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import {
  documentState,
  inputFieldObjectState,
} from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { is_numeric } from "../utils";
import { choosenApplicationState } from "../../stateManagement/choosenApplication";
import { firestore } from "../../firebase";

const ShortText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const [value, setValue] = useState("");
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getValue();
    }
  });

  const handleChange = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
  };

  const docRef = useDocRef();

  // const splitID = (id: string) => {
  //   let attributeName: string = "";
  //   let inputNr: string = "";
  //   id.split("").forEach((character) => {
  //     if (is_numeric(character)) {
  //       inputNr += character;
  //     } else {
  //       attributeName += character;
  //     }
  //   });
  //   return [attributeName, inputNr];
  // };

  async function getValue() {
    if (docRef == undefined) {
      return "";
    }

    let attributeName: string = "";
    let input: string = "input";
    id.split("").forEach((character) => {
      if (is_numeric(character)) {
        input += character;
      } else {
        attributeName += character;
      }
    });
    let fieldPath = `${chapterName}.attributes.${attributeName}.input_fields.${input}.value`;

    await docRef
      .get()
      .then((res) => {
        let value = res.get(fieldPath);
        setValue(value);
      })
      .catch((error) => {
        console.log("Error in retrieveing value:", error);
      });
  }

  const handleValueChange = (value: any) => {
    setValue(value);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>

      <TextField
        id="outlined-basic"
        variant="outlined"
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        fullWidth
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default ShortText;
