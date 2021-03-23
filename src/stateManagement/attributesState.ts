import { selector } from "recoil";
import { atom, atomFamily } from "recoil";

export const inputFieldListState = atom({
  key: "inputFieldListState",
  default: {},
});

export const attributesState = atomFamily({
  key: "attributesState",
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
