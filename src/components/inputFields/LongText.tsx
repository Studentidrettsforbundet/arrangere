import { FC } from "react";
import { TextField, Typography, Box } from "@material-ui/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  attributesState,
  selectedAttributeIdState,
} from "../../stateManagement/attributesState";
import { InputFieldProps } from "./ShortText";

const LongText: FC<InputFieldProps> = ({ desc, id, chapterName }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);
  const selectedID = useRecoilValue(selectedAttributeIdState);
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
