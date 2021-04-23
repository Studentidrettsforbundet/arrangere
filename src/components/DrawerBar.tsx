import StudentidrettLogo from "./../images/studentidrett-logo-sort.png";
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
import { Link } from "react-router-dom";
import { useStyles } from "../style/drawerBar";
import { auth } from "../firebase";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../stateManagement/userAuth";

function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  e.preventDefault();
  auth
    .signOut()
    .then(function () {})
    .catch((error) => {
      console.error("Not able to log out");
    });
}

export default function DrawerBar() {
  const classes = useStyles();
  const userRole = useRecoilValue(userRoleState);

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
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Hjem" />
            </ListItem>
            <ListItem button component={Link} to="/userprofile">
              <ListItemIcon>
                <PersonOutlineOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Brukerprofil" />
            </ListItem>

            <ListItem button component={Link} to="/applications">
              <ListItemIcon>
                <DescriptionOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Søknader" />
            </ListItem>
            {userRole == "admin" ? (
              <ListItem button component={Link} to="/receivedApplications">
                <ListItemIcon>
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Innsendte søknader" />
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
