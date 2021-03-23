import { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const FileUpload: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
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
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </Box>
  );
};
export default FileUpload;
