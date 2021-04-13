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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firestore } from "../firebase";
import { documentState } from "../stateManagement/attributesState";
import { currentUserState } from "../stateManagement/userAuth";
import { useStyles } from "../style/cards";
import { addDocToUser } from "./inputFields/addDocToUser";
import DisplayError from "./DisplayError";

type CardProps = {
  image: string;
  title: string;
  to: string;
  template: string;
};

export const ApplicationCard = (props: CardProps) => {
  const classes = useStyles();

  const setDocID = useSetRecoilState(documentState);
  const currentUser = useRecoilValue(currentUserState);

  async function copyDoc(template: string) {
    let collectionFrom = template + "Template";
    let collectionTo = template + "Applications";
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
        <DisplayError message={error.message} title={error.name} />;
        // console.error(
        //   "Error reading document",
        //   `${collectionFrom}/`,
        //   JSON.stringify(error)
        // );
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
            console.log(
              "New document created with id:" +
                newDocId +
                "\nIn collection " +
                template
            );
          })
          .catch((error) => {
            <DisplayError message={error.message} title={error.name} />;
            // console.error(
            //   "Error creating document",
            //   `${collectionTo}`,
            //   JSON.stringify(error)
            // );
          });
      });
      await firestore
        .collection(collectionTo)
        .doc(newDocId)
        .set({ status: "in progress" }, { merge: true })
        .then(() => {
          console.log(
            "Status field created in doc:" +
              newDocId +
              "\nIn collection " +
              template
          );
        })
        .catch((error) => {
          console.error(
            "Error creating document",
            `${collectionTo}`,
            JSON.stringify(error)
          );
        });
      addDocToUser(currentUser!.uid, newDocId, collectionTo);
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
          onClick={() => copyDoc(props.template)}
        >
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
