import React, { useEffect, useState } from "react";
import StudentidrettLogo from "./../images/studentidrett-logo-sort.png";
import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import {
  CssBaseline,
  CardMedia,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../style/drawerBar";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../stateManagement/userAuth";
import firebase from "firebase";


function handleLogout(e: any) {
  e.preventDefault();
  auth
    .signOut()
    .then(function () {
      console.log("signout complete");
    })
    .catch((error) => {
      console.log("Kunne ikke logge ut");
    });
}

export default function DrawerBar() {
  const classes = useStyles();
  const currentUser = useRecoilValue(currentUserState);
  let [userRole, setUserRole] = useState<any>();
  var db = firebase.firestore();

  useEffect(() => {
    getUserRole();
  }, [userRole]);


  async function getUserRole() {
    if (currentUser != null) {
      await db
        .collection("user")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const data = doc?.data();
          if (!data) {
            console.log("no data here");
            return null;
          } else {
            setUserRole(data.role);
          }
        });
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className="drawerContent">
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List component="nav" className={classes.root}>
            <CardMedia className={classes.media} image={StudentidrettLogo} />
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <AppsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Hjem" />
            </ListItem>
            <ListItem button component={Link} to="/userprofile">
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Brukerprofil" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/applications">
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Søknader" />
            </ListItem>
            {userRole == "admin" ? <ListItem button component={Link} to="/submitted">
              < ListItemIcon ><DescriptionOutlinedIcon />
              </ListItemIcon><ListItemText primary="Innsendte søknader" />
            </ListItem> : " "}
            <Button
              variant="contained"
              className={classes.logout}
              component={Link}
              to="/login"
              onClick={handleLogout}
            >
              Logg ut
            </Button>
          </List>
        </Drawer>
      </div >
    </div >
  );
}

