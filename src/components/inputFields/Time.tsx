import { FC, useEffect, useRef, useState } from "react";
import { useStyles } from "../../style/inputStyles";
import { Typography, TextField, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";

const Time: FC<InputProps> = ({ desc, id, chapterName }) => {
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
    inputProperties = { "aria-label": id, step: 300 };
  } else {
    inputProperties = { "aria-label": desc, step: 300 };
  }

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <form className={classes.container} noValidate>
        <TextField
          label="Tidspunkt"
          type="time"
          defaultValue="12:00"
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
export default Time;
