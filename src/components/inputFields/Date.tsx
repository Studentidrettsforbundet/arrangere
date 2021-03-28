import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const Date: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const classes = useStyles();
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
      <form noValidate>
        <TextField
          id="date"
          label="Velg en dato"
          type="date"
          defaultValue="2021-01-01"
          onBlur={(e) => {
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
