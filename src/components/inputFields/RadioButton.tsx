import { FC } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core/";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const RadioButton: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedID = useRecoilValue(selectedAttributeIdState);

  return (
    <div className="radioContainer">
      <FormControl component="fieldset">
        <FormLabel component="legend">{desc}</FormLabel>
        <RadioGroup name="radio">
          <FormControlLabel
            value="Ja"
            control={<Radio />}
            label="Ja"
            onFocus={() => setSelectedAttribute(id)}
            onChange={() =>
              setAttribute({
                ...attribute,
                value: "Ja",
                id: selectedID,
              })
            }
          />
          <FormControlLabel
            value="Nei"
            control={<Radio />}
            label="Nei"
            onFocus={() => setSelectedAttribute(id)}
            onChange={() =>
              setAttribute({
                ...attribute,
                value: "Nei",
                id: selectedID,
              })
            }
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};
export default RadioButton;
