import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type TimeProps = {
  desc: string;
  id: string;
};

const Time: FC<TimeProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  console.log(selectedAttribute);
  console.log(selectedID);

  const classes = useStyles();
  return (
    <div className="timeContainer">
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
    </div>
  );
};
export default Time;
