import React, { FC } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Typography } from "@material-ui/core";

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
