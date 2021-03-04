import React from "react";
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
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStyles } from "../style/drawerBar";

export default function DrawerBar() {
  const classes = useStyles();

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
