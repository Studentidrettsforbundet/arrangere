import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const Time: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedID = useRecoilValue(selectedAttributeIdState);

  const classes = useStyles();
  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <form className={classes.container} noValidate>
        <TextField
          id="time"
          label="Tidspunkt"
          type="time"
          defaultValue="12:00"
          onFocus={() => setSelectedAttribute(id)}
          onChange={(event) =>
            setAttribute({
              ...attribute,
              value: event.target.value,
              id: selectedID,
            })
          }
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
