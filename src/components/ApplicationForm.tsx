import Template from "./Template";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { useEffect, useState } from "react";
import saveFieldToStorage from "./FirebaseStorage";
import Box from "@material-ui/core/Box";
import { ChapterWithID } from "./copyDocument";
import AddDocToUser from "./copyDocument";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";

export const ApplicationForm = () => {
  const [loading, setLoading] = useState(true);
  const [newDocId, setNewDocId] = useState("");
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  let collection = useRecoilValue(choosenApplicationState);

  console.log(collection);

  let url = window.location.href;
  var str_sub = url.substr(url.lastIndexOf("/") + 1);

  useEffect(() => {
    setApplicationForm();
    copyDoc(collection + "Template", collection + "Applications");
  }, []);

  function setApplicationForm() {
    if (str_sub == "studentnm") {
      setChoosenApplicationForm("snm");
    }
    if (str_sub == "studentleker") {
      setChoosenApplicationForm("sl");
    }
    if (str_sub == "studentcup") {
      setChoosenApplicationForm("sc");
    }
  }

  async function copyDoc(collectionFrom: string, collectionTo: string) {
    setLoading(true);
    const docFromRef = firestore.collection(collectionFrom);
    let chapterListLocal: Array<ChapterWithID> = [];
    let chapterExists: boolean = false;

    const docData = await docFromRef
      .get()
      .then((doc) => {
        doc.forEach((chapter) => {
          if (chapter.exists) {
            chapterExists = true;
          }
          chapterListLocal.push({
            id: chapter.id,
            content: {
              title: chapter.data().title,
              desc: chapter.data().desc,
              attributes: chapter.data().attributes,
              priority: chapter.data().priority,
            },
          });
        });
        return chapterExists;
      })
      .catch((error) => {
        console.error(
          "Error reading document",
          `${collectionFrom}/`,
          JSON.stringify(error)
        );
      });

    const docToRef = await firestore.collection(collectionTo).doc();
    let newDocId = docToRef.id;

    if (docData) {
      chapterListLocal.forEach(async (chapter) => {
        let chapterId = chapter.id;
        await firestore
          .collection(collectionTo)
          .doc(newDocId)
          .set({ [chapterId]: chapter.content }, { merge: true })
          .then(() => {
            console.log("New document created with id:", newDocId);
          })
          .catch((error) => {
            console.error(
              "Error creating document",
              `${collectionTo}`,
              JSON.stringify(error)
            );
          });
      });
      setNewDocId(newDocId);
    }
    setLoading(false);
  }

  AddDocToUser(newDocId);

  if (!loading) {
    saveFieldToStorage(
      selectedAttribute?.id,
      selectedAttribute?.value,
      collection,
      newDocId
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <Box px={15} pb={8}>
        <Template></Template>
      </Box>
    </div>
  );
};
