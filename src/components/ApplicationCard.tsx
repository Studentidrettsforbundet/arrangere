import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { firestore } from "../firebase";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { localStorageEffect } from "../stateManagement/localstorageRecoil";
import { useStyles } from "../style/cards";
import { ChapterWithID } from "./copyDocument";

type CardProps = {
  image: string;
  title: string;
  to: string;
  template: string;
};

export const documentState = atom<string>({
  key: "documentState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("docID")],
});

export const ApplicationCard = (props: CardProps) => {
  const classes = useStyles();

  const [docID, setDocID] = useRecoilState(documentState);

  let collection = useRecoilValue(choosenApplicationState);

  async function copyDoc(collectionFrom: string, collectionTo: string) {
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

    const docToRef = firestore.collection(collectionTo).doc();
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
      setDocID(newDocId);
    }
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          component={RouterLink}
          to={{
            pathname: props.to,
            state: { template: props.template },
          }}
          size="small"
          color="primary"
          onClick={() =>
            copyDoc(collection + "Template", collection + "Applications")
          }
        >
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
