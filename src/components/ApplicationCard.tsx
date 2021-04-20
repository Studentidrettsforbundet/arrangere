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
import { useEffect, useState } from "react";

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

    const date: Date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dateStr = day + "/" + month + "/" + year;

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

      let tempOrganization = "";

      const organization = await firestore
        .collection("user")
        .doc(currentUser?.uid)
        .get()
        .then((doc) => {
          const data = doc!.data();
          if (data != undefined) {
            tempOrganization = data.organization;
          }
          return tempOrganization;
        });

      await firestore
        .collection(collectionTo)
        .doc(newDocId)
        .set(
          {
            status: "in progress",
            user_id: [currentUser?.uid],
            user_email: [currentUser?.email],
            user_organization: tempOrganization,
            date: dateStr,
          },
          { merge: true }
        )
        .then(() => {
          console.log("user_id set in document to: " + currentUser?.uid);
        })
        .catch((error) => {
          console.error(
            "Error creating user_id field in",
            `${collectionTo}`,
            JSON.stringify(error)
          );
        });
      addDocToUser(currentUser!.uid, newDocId, template);
      setDocID(newDocId);
    }
  }

  return (
    <Card className={classes.root} style={{ width: 250, padding: 25 }}>
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
          onClick={() => {
            // getOrganization();
            copyDoc(props.template);
          }}
        >
          Ny søknad
        </Button>
      </CardActions>
    </Card>
  );
};
