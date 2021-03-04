import React, { FC } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core/";

type RadioProps = {
  desc: string;
};

const RadioButton: FC<RadioProps> = ({ desc }) => {
  return (
    <div className="radioContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup name="radio">
          <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
          <FormControlLabel value="Nei" control={<Radio />} label="Nei" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButton;
