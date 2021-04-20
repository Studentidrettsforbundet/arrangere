import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { InfoLongText } from "./InfoLongText";
import { Typography, Box } from "@material-ui/core";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [chapterList, setChapterList] = useState<InfoLongTextProps[]>([]);
  useEffect(() => {
    generateApplicationForm();
  }, []);

  async function generateApplicationForm() {
    setLoading(true);
    let chapterListLocal: Array<InfoLongTextProps> = [];

    await firestore
      .collection("userHomePage")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((chapter) => {
          if (chapter.exists) {
            chapterListLocal.push({
              title: chapter.data().title,
              desc: chapter.data().desc,
              priority: chapter.data().priority,
            });
          } else {
            console.log("No such document!");
            throw new Error("No document.");
          }
        });
      })
      .catch((error) => {
        console.log("Error getting document: ", error);
      });
    setChapterList(chapterListLocal);
    chapterListLocal = [];
    setLoading(false);
  }

  const renderChapters = (chapterList: Array<InfoLongTextProps>) => {
    const chapters: any = [];
    chapterList.map((chapter: InfoLongTextProps) => {
      chapters.push(
        <InfoLongText
          key={chapter.title}
          desc={chapter.desc}
          priority={chapter.priority}
          title={chapter.title}
        />
      );
    });
    chapterList.sort(
      (a: InfoLongTextProps, b: InfoLongTextProps) => a.priority - b.priority
    );
    return chapters;
  };

  return (
    <div role="main">
      <Box p={10}>
        <Typography variant="h1">
          Velkommen til Norges studentidrettsforbunds søknadsportal
        </Typography>
        <Box py={2}>{renderChapters(chapterList)}</Box>
      </Box>
    </div>
  );
}
