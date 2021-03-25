import { FC } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";

import { addFieldInputObject } from "./saveInputFields";

export type InputFieldProps = {
  desc: string;
  id: string;
  chapterName: string;
};

const ShortText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

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
        fullWidth
        onBlur={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default ShortText;
