import { FC } from "react";
import { TextField, Typography } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type ShortTextProps = {
  desc: string;
  id: string;
};

const ShortText: FC<ShortTextProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  console.log(selectedAttribute);
  console.log(selectedID);

  return (
    <div className="shortTextContainer">
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        onFocus={() => setSelectedAttribute(id)}
        onChange={(event) =>
          setAttribute({
            ...attribute,
            value: event.target.value,
            id: selectedID,
          })
        }
      />
    </div>
  );
};
export default ShortText;
