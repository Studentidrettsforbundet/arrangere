import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { TextField, Typography, Box } from "@material-ui/core";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "../application/saveInputFields";
import { getInputValue } from "./getInputValue";

const Number: FC<InputProps> = ({ desc, id, chapterName }) => {
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
  if (desc === "") {
    inputProperties = { "aria-label": id };
  } else {
    inputProperties = { "aria-label": desc };
  }

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        variant="outlined"
        fullWidth
        inputProps={inputProperties}
        type="number"
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default Number;
