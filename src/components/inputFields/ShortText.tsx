import { FC, useEffect, useState } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const ShortText: FC<InputFieldProps> = ({ desc, id, chapterName, value }) => {
  const [val, setVal] = useState("");

  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  useEffect(() => {
    setVal(value);
  });

  const handleChange = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        value={val}
        fullWidth
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default ShortText;
