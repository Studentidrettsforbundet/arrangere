import { FC, useEffect, useRef, useState } from "react";
import { TextField, Box, Typography } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "../application/saveInputFields";
import { getInputValue } from "./getInputValue";
import { useStyles } from "../../style/inputStyles";

const Date: FC<InputProps> = ({ desc, id, chapterName }) => {
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
      getInputValue(docRef!, chapterName, id).then((value) => {
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
      <Typography>{desc}</Typography>
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
