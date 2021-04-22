import React, { FC } from "react";
import { Typography, Button, Box } from "@material-ui/core";

import { generateComponents } from "./getInputFieldComponent";
import Accordions from "../accordions/Accordions";

const InputWrapper: FC<InputWrapperProps> = ({
  title,
  mainDesc,
  inputFields,
  buttons,
  chapterName,
  attributeName,
}) => {
  let isCollapse;
  let isExtraField;
  if (buttons != null) {
    buttons.forEach((button) => {
      let buttonName = button.split(" ");
      if (buttonName[1] == attributeName) {
        isCollapse = true;
      }
      if (buttonName[1] == attributeName.substr(0, attributeName.length - 1)) {
        isExtraField = true;
      }
    });
  }

  return (
    <div style={{ width: "100%" }}>
      {isCollapse ? (
        <Accordions
          key={attributeName}
          title={title}
          mainDesc={mainDesc}
          chapterName={chapterName}
          attributeName={attributeName}
        ></Accordions>
      ) : (
        <div>
          {isExtraField ? (
            <div></div>
          ) : (
            <div>
              <Typography variant="h6">{title}</Typography>
              {mainDesc != "" ? (
                <Box>
                  <Typography component="p">{mainDesc}</Typography>
                </Box>
              ) : (
                ""
              )}
              <div>{generateComponents(inputFields, chapterName)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputWrapper;
