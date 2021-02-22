import React, { FC } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

type RadioProps = {
  desc: string;
  label: string;
};

const RadioButton: FC<RadioProps> = ({ desc, label }) => {
  return (
    <div className="radios">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup aria-label={label} name="radio">
          <FormControlLabel value="Ja" control={<Radio />} label="Ja" />
          <FormControlLabel value="Nei" control={<Radio />} label="Nei" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButton;
