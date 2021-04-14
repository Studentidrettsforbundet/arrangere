import { FC, useEffect, useRef, useState } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";

const LongText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
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
      <Typography>{desc}</Typography>
      <TextField
        fullWidth
        multiline
        inputProps={inputProperties}
        rows={4}
        value={value}
        onChange={(e) => handleValueChange(e.target.value)}
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </Box>
  );
};
export default LongText;
