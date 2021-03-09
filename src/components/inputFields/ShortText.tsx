import { FC } from "react";
import { TextField, Typography } from "@material-ui/core";
import {
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { atom, atomFamily } from "recoil";

type ShortTextProps = {
  desc: string;
  id: string;
};

export const attributesState = atomFamily({
  key: "attributes",
  default: () => ({
    id: "",
    value: "",
  }),
});

export const selectedAttributeIdState = atom({
  key: "selectedAttributeIdState",
  default: "",
});

export const selectedAttributeState = selector({
  key: "selectedAttributeState",
  get: ({ get }) => {
    const id = get(selectedAttributeIdState);
    if (id.length > 0) {
      return get(attributesState(id));
    }
  },
});

const ShortText: FC<ShortTextProps> = ({ desc, id }) => {
  const [attribute, setAttribute] = useRecoilState(attributesState(id));
  const setSelectedAttribute = useSetRecoilState(selectedAttributeIdState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  const selectedID = useRecoilValue(selectedAttributeIdState);

  //console.log("selected attribute:", selectedAttribute);
  //console.log("selected id for attribute:", selectedID);

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
