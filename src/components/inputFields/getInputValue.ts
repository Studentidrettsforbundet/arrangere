import { splitToAttributeName, splitToInputNr } from "../utils";

export async function getInputValue(
  docRef: any,
  chapterName: string,
  id: string
) {
  let value = "";

  if (docRef === undefined) {
    return value;
  }

  let attributeName = splitToAttributeName(id);
  let inputNr = splitToInputNr(id);

  let fieldPath = `${chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`;
  console.log(fieldPath);

  await docRef
    .get()
    .then((res: any) => {
      value = res.get(fieldPath);
      return value;
    })
    .catch((error: any) => {
      console.log("Error in retrieving value:", error);
    });
  return value;
}
