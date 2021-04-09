import { FC } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core/";
import { useRecoilState } from "recoil";
import { inputFieldObjectState } from "../../stateManagement/attributesState";
import { addFieldInputObject } from "./saveInputFields";

const RadioButton: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [inputFieldObject, setInputFieldList] = useRecoilState(
    inputFieldObjectState
  );

  const handleChange = (value: string) => {
    let object = addFieldInputObject(value, chapterName, inputFieldObject, id);
    setInputFieldList(object);
  };

  return (
    <div className="radioContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup name="radio">
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
