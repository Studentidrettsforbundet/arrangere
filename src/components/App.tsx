import React from "react";
import InputWrapper from "./inputFields/InputWrapper";
import { RecoilRoot } from "recoil";
import Date from "./inputFields/Date";
import { Typography } from "@material-ui/core";
import ShortText from "./inputFields/ShortText";
import Time from "./inputFields/Time";
import Number from "./inputFields/Number";
import RadioButton from "./inputFields/RadioButton";
import FileUpload from "./inputFields/FileUpload";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Typography variant="h2">Her skal det komme en søknadsside</Typography>
        <InputWrapper
          title="title (Økonomi etc.)"
          mainDesc="main description: Denne seksjonen handler om..."
          fields={{
            type: "long text",
            desc: "field description: Et langt/multiline tekstfelt",
          }}
        ></InputWrapper>
        <ShortText desc="field description: Et kort tekstfelt"></ShortText>
        <Number desc="Pris uten overnatting"></Number>
        <Date desc="Oppgi dato for akkreditering"></Date>
        <Time desc="Oppgi tidspunkt for åpning av akkreditering"></Time>
        <RadioButton desc="Er det kiosk?"></RadioButton>
        <FileUpload desc="Last opp budsjett her"></FileUpload>
      </div>
    </RecoilRoot>
  );
}

export default App;
