import React from "react";
import InputWrapper from "./inputFields/InputWrapper";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <p>Her skal det komme en søknadsside</p>
        <InputWrapper
          title="title"
          mainDesc="main description"
          fields={{ type: "radio button", desc: "field description" }}
        ></InputWrapper>
      </div>
    </RecoilRoot>
  );
}

export default App;
