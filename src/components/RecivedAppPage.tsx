import firebase from "firebase";
import { useEffect, useState } from "react";
import RecivedAppCard from "./RecivedAppCard";

export default function RecivedAppPage() {
  return (
    <div>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <RecivedAppCard collectionName="snmApplications" />
      <h2>Studentleker</h2>
      <RecivedAppCard collectionName="slApplications" />
      <h2>Student-Cup</h2>
      <RecivedAppCard collectionName="scApplications" />
    </div>
  );
}
