import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { firestore } from "../firebase";
import { selectedAttributeState } from "../stateManagement/attributesState";
import { choosenApplicationState } from "../stateManagement/choosenApplication";
import { localStorageEffect } from "../stateManagement/localstorageRecoil";
import { useStyles } from "../style/cards";
import AddDocToUser, { ChapterWithID } from "./copyDocument";

type Props = {
  image: string;
  title: string;
  to: string;
  template: string;
};

export const documentIDState = atom<string>({
  key: "documentIDState",
  default: "",
  effects_UNSTABLE: [localStorageEffect("docID")],
});

export const ApplicationCard = (props: Props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const [newDocId, setNewDocId] = useState("");
  const setChoosenApplicationForm = useSetRecoilState(choosenApplicationState);
  const [docID, setDocID] = useRecoilState(documentIDState);

  const selectedAttribute = useRecoilValue(selectedAttributeState);
  let collection = useRecoilValue(choosenApplicationState);

  console.log(collection);

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
      setDocID(newDocId);
    }
    setLoading(false);
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
