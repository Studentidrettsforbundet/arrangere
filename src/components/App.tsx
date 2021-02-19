import React from "react";
import SignUp from "./SignUp";
import { RecoilRoot } from "recoil";

function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  return (
    <RecoilRoot>
      <div className="App">
        <SignUp></SignUp>
      </div>
    </RecoilRoot>
  );
}

export default App;
