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

const RadioButton: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const [value, setValue] = useState("");
  const checkedJa = React.createRef();
  const checkedNei = React.createRef();
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
  };

  const handleValueChange = (value: string) => {
    let radioJa = checkedJa.current;
    let radioNei = checkedJa.current.setAttribute('checked, '');
    console.log(radioJa);
    if (value === "Ja") {
      //radioJa.setAttribute("checked", "");
      //legg til checked attributt på formcontrol med id radioJa
    } else if (value === "Nei") {
      //legg til checked attributt på formcontrol med id radioNei
    }
  };

  return (
    <div className="radioContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup name="radio">
          <FormControlLabel
            value="Ja"
            ref={checkedJa}
            control={<Radio />}
            label="Ja"
            onChange={() => {
              handleChange("Ja");
              handleValueChange("Ja");
            }}
          />
          <FormControlLabel
            value="Nei"
            ref={checkedNei}
            control={<Radio />}
            label="Nei"
            onChange={() => {
              handleChange("Nei");
              handleValueChange("Nei");
            }}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButton;
