import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../../firebase";
import { documentState } from "../../stateManagement/attributesState";
import {
  chapterCounterState,
  choosenApplicationState,
} from "../../stateManagement/choosenApplication";
import Application from "../Application";

export const UserApplication = () => {
  //foreslår å endre dette navnet til UserApplicationReview
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  let currentApplicationId: string = useRecoilValue(documentState);
  let currentCollection: string = useRecoilValue(choosenApplicationState);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);
  const setChapterCounter = useSetRecoilState(chapterCounterState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      setChapterCounter(0);
    }
    retriveApplicationData(currentCollection, currentApplicationId);
  }, [currentApplicationId]);

  async function retriveApplicationData(
    currentCollection: string,
    currentApplicationId: string
  ) {
    setLoading(true);
    let chapterListLocal: Array<Chapter> = [];

    await firestore
      .collection(currentCollection + "Applications")
      .doc(currentApplicationId)
      .get()
      .then((doc) => {
        const docData = doc?.data();
        if (!docData) {
          console.log("No data here");
          return null;
        } else {
          for (let chapter in docData) {
            if (chapter != "status" && chapter != "user_id") {
              chapterListLocal.push({
                chapterName: chapter,
                buttons: docData[chapter].buttons,
                title: docData[chapter].title,
                desc: docData[chapter].desc,
                attributes: docData[chapter].attributes,
                priority: docData[chapter].priority,
              });
            }
          }
        }
      });
    setChapterList(chapterListLocal);
    setLoading(false);
  }

  console.log(chapterList);

  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <p>Laster inn..</p>
      ) : (
        <Application chapterList={chapterList}></Application>
      )}
    </div>
  );
};
