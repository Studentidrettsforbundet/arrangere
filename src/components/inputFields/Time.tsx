import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField, Box } from "@material-ui/core";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const Time: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );
  const classes = useStyles();

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
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label="Tidspunkt"
          type="time"
          defaultValue="12:00"
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </form>
    </Box>
  );
};
export default Time;
