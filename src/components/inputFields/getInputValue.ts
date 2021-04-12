export async function getInputValue(
  docRef: any,
  chapterName: string,
  id: string
) {
  let value = "";

  if (docRef === undefined) {
    return value;
  }

  let newKey = id.split("-");
  let attributeName = newKey[0];
  let inputNr = newKey[1];

  let fieldPath = `${chapterName}.attributes.${attributeName}.input_fields.input${inputNr}.value`;

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
