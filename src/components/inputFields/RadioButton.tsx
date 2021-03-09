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
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type RadioProps = {
  desc: string;
  id: string;
};

const RadioButton: FC<RadioProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  console.log(selectedAttribute);
  console.log(selectedID);

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
