import React from "react";
import FirebaseStorage from "./FirebaseStorage";

export default function Home() {
  return (
    <div>
      <br />

      <h1>Hjem</h1>
      <p>Dette er hjem siden</p>
      <FirebaseStorage></FirebaseStorage>
    </div>
  );
}
