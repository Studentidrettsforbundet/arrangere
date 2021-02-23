import React from "react";
import InputWrapper from "./inputFields/InputWrapper";
import { RecoilRoot } from "recoil";
import Date from "./inputFields/Date";
import { Typography } from "@material-ui/core";
import ShortText from "./inputFields/ShortText";
import Time from "./inputFields/Time";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Typography variant="h2">Her skal det komme en søknadsside</Typography>
        <InputWrapper
          title="title"
          mainDesc="main description: Denne seksjonen handler om..."
          fields={{
            type: "long text",
            desc: "field description: Et langt/multiline tekstfelt",
          }}
        ></InputWrapper>
        <ShortText desc="field description: Et kort tekstfelt"></ShortText>
        <Date desc="Dato"></Date>
        <Time desc="Tidspunkt"></Time>
      </div>
    </RecoilRoot>
  );
}

export default App;
