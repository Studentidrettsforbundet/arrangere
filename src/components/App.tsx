import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { RecoilRoot } from "recoil";
import RenderSmallInput from "./NmForm";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        {/* p>Her skal det komme en søknadsside</p>
      <SignUp ></SignUp>
      <Login></Login> */}
        <RenderSmallInput />
      </div>
    </RecoilRoot>
  );
}

export default App;
