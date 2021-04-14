import React, { FC, useEffect, useRef, useState } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField, Box, InputLabel } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";

const Date: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const classes = useStyles();
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const [value, setValue] = useState("");
  const isInitialMount = useRef(true);
  const docRef = useDocRef();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getInputValue(docRef, chapterName, id).then((value) => {
        setValue(value);
      });
    }
  });

  const handleChange = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
  };

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  let inputProperties;
  if (desc == "") {
    inputProperties = { "aria-label": id };
  } else {
    inputProperties = { "aria-label": desc };
  }

  return (
    <Box py={2}>
      <InputLabel>{desc}</InputLabel>
      <form noValidate>
        <TextField
          id={id}
          label="Velg en dato"
          type="date"
          defaultValue="2021-01-01"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
          onBlur={(e) => {
            handleChange(e.target.value);
          }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={inputProperties}
        />
      </form>
    </Box>
  );
};
export default Date;
