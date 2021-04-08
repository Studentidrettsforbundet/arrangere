import { FC } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const LongText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
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
        fullWidth
        multiline
        rows={4}
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
