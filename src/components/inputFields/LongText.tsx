import { FC } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  inputFieldObjectState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const LongText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const handleChange = (value: string) => {
    let inputFieldObjectLocal = Object.assign({}, inputFieldObject);
    Object.assign(inputFieldObjectLocal, { [id]: value });
    Object.assign(inputFieldObjectLocal, { chapterName: chapterName });
    setInputFieldList(inputFieldObjectLocal);
    console.log(inputFieldObject);
  };

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        fullWidth
        multiline
        rows={4}
        onChange={(e) => {
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
