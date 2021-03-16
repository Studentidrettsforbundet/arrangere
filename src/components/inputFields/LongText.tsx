import { FC } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
  selectedAttributeState,
} from "../../stateManagement/attributesState";

type LongTextProps = {
  desc: string;
  id: string;
};

const LongText: FC<LongTextProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  //console.log(selectedAttribute);
  //console.log(selectedID);

  return (
    <Box py={2}>
      <Typography>{desc}</Typography>
      <TextField
        id="outlined-basic"
        fullWidth
        multiline
        rows={4}
        onFocus={() => setSelectedAttribute(id)}
        onChange={(event) =>
          setAttribute({
            ...attribute,
            value: event.target.value,
            id: selectedID,
          })
        }
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
    </Box>
  );
};
export default LongText;
