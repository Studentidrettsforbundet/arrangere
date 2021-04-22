import { FC, useEffect, useRef, useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core/";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject, useDocRef } from "./saveInputFields";
import { getInputValue } from "./getInputValue";
import React from "react";

const RadioButton: FC<InputProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const [value, setValue] = useState("Ja");
  const isInitialMount = useRef(true);
  const docRef = useDocRef();

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getInputValue(docRef, chapterName, id).then((value) => {
        setValue(value);
      });
    }
  });

  const handleChange = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
    setValue(value);
  };

  return (
    <div className="radioContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup value={value} name="radio">
          <FormControlLabel
            value="Ja"
            control={<Radio />}
            label="Ja"
            onChange={() => {
              handleChange("Ja");
            }}
          />
          <FormControlLabel
            value="Nei"
            control={<Radio />}
            label="Nei"
            onChange={() => {
              handleChange("Nei");
            }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButton;
