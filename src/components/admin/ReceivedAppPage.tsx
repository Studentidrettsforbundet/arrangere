import ReceivedAppCard from "./ReceivedAppCard";

export default function RecivedAppPage() {
  return (
    <div>
      <h1>Innsendte søknader</h1>
      <h2>Student-NM</h2>
      <ReceivedAppCard collectionName="snmApplications" />
      <h2>Studentleker</h2>
      <ReceivedAppCard collectionName="slApplications" />
      <h2>Student-Cup</h2>
      <ReceivedAppCard collectionName="scApplications" />
    </div>
  );
}
