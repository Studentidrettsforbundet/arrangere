import React from "react";

import StudentidrettLogo from "./../images/studentidrett-logo-sort.png";

import AppsOutlinedIcon from "@material-ui/icons/AppsOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

import CardMedia from "@material-ui/core/CardMedia";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";

import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 300,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    media: {
      height: 22,
      margin: 10,
    },
  })
);

export default function DrawerBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className="drawerContent">
        {" "}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
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
          </List>
        </Drawer>
      </div>
    </div>
  );
}
