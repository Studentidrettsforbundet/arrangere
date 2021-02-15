import React from "react";
import SignUp from "./SignUp";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';




function App() {
  return (
    <RecoilRoot>
    <div className="App">
      <p>Her skal det komme en søknadsside</p>
      <SignUp ></SignUp>
    </div>
    </RecoilRoot>
  );
}

export default App;
