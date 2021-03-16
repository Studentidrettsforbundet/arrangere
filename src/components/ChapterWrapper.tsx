import { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Chapter, Attribute } from "./Template";
import InputWrapper, { InputField } from "./inputFields/InputWrapper";
import { useStyles } from "../style/chapters";

type ChapterProps = {
  chapter: Chapter;
};

const ChapterWrapper = (props: ChapterProps) => {
  let chapter = props.chapter;
  const [loading, setLoading] = useState(true);
  const [attributeList, setAttributeList] = useState<Attribute[]>([]);
  const classes = useStyles();

  useEffect(() => {
    renderAttributes(chapter.attributes);
    if (!loading) {
      renderInputFields(attributeList);
    }
  }, [loading]);

  const renderAttributes = (attributes: any) => {
    setLoading(true);
    const attributeListLocal: any = [];
    if (attributes) {
      Object.keys(attributes).forEach((attribute: string) => {
        attributeListLocal.push(attributes[attribute]);
        attributeListLocal.sort((a: any, b: any) => a.priority - b.priority);
      });
    } else {
      console.log("No attributes!");
    }
    setAttributeList(attributeListLocal);
    setLoading(false);
    //console.log("list: ", attributeList[0].title);
  };

  const renderInputFields = (attributeList: any) => {
    const inputWrappers: any = [];
    let inputFields: Array<InputField> = [];
    attributeList.map((attribute: Attribute) => {
      console.log("attributes: ", attributeList);

      //console.log(attribute.title);

      Object.keys(attribute).forEach((inputField: InputField) => {
        inputFields.push({
          type: inputFields.type,
          desc: inputField.desc,
          priority: inputField.priority,
        });
      });
      inputWrappers.push(
        <InputWrapper
          key={attribute.title}
          title={attribute.title}
          mainDesc={attribute.mainDesc}
          inputFields={inputFields}
          priority={attribute.priority}
        />
      );

      inputFields = [];
    });
  };
  return (
    <div style={{ width: "100%" }}>
      {/* <Typography variant="h4">{chapter.title}</Typography>
      <Typography gutterBottom={true} variant="h6">
        {chapter.desc}
      </Typography> */}
      <div className={classes.chapter}></div>
      <div></div>
    </div>
  );
};

export default ChapterWrapper;
