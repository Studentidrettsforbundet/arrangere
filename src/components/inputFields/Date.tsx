import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  inputFieldObjectState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const Date: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const classes = useStyles();
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
      <form noValidate>
        <TextField
          id="date"
          label="Velg en dato"
          type="date"
          defaultValue="2021-01-01"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </Box>
  );
};
export default Date;
