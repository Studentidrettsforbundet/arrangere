import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import {
  CssBaseline,
  CardMedia,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";

import { userRoleState } from "../../stateManagement/userAuth";
import { errorState } from "../../stateManagement/errorHandling";
import { useStyles } from "../../style/drawerBar";
import { auth } from "../../firebase";

import StudentidrettLogo from "../../images/studentidrett-logo-sort.png";
import { useState } from "react";

export default function DrawerBar() {
  const setError = useSetRecoilState(errorState);
  const classes = useStyles();
  const userRole = useRecoilValue(userRoleState);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    auth.signOut().catch(() => {
      setError("logout");
    });
  }

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

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
          <List component="nav" aria-label="Main" className={classes.root}>
            <CardMedia className={classes.media} image={StudentidrettLogo} />
            <ListItem
              selected={selectedIndex === 0}
              onClick={(event: any) => handleListItemClick(event, 0)}
              button
              component={Link}
              to="/"
            >
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Hjem" />
            </ListItem>
            <ListItem
              selected={selectedIndex === 1}
              onClick={(event: any) => handleListItemClick(event, 1)}
              button
              component={Link}
              to="/userprofile"
            >
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Brukerprofil" />
            </ListItem>

            <ListItem
              selected={selectedIndex === 2}
              onClick={(event: any) => handleListItemClick(event, 2)}
              button
              component={Link}
              to="/applications"
            >
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Søknader" />
            </ListItem>
            {userRole === "admin" ? (
              <ListItem
                selected={selectedIndex === 3}
                onClick={(event: any) => handleListItemClick(event, 3)}
                button
                component={Link}
                to="/receivedApplications"
              >
                <ListItemIcon>
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Administrer søknader" />
              </ListItem>
            ) : (
              " "
            )}
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
      </div>
    </div>
  );
}
