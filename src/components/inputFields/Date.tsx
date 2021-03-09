import { FC } from "react";
import { useStyles } from "./inputStyles";
import { Typography, TextField } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type DateProps = {
  desc: string;
  id: string;
};

const Date: FC<DateProps> = ({ desc, id }) => {
  const classes = useStyles();

  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  console.log(selectedAttribute);
  console.log(selectedID);

  return (
    <div className="dateContainer">
      <Typography>{desc}</Typography>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Dato"
          type="date"
          defaultValue="2021-01-01"
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
        />
      </form>
    </div>
  );
};
export default Date;
