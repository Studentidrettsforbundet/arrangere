import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';
import { Divider } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
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
  }),
);

export default function DrawerBar() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true); {/* Sjekk state håndtering, bruke recoil her? */}

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
          <div className="drawerContent"> {/* Sjekk om dette er riktig måte å skrive klassenavn på */}

          </div>
        
       <List
      component="nav"
     aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Meny
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <AppsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Hjem" />
      </ListItem>
      <ListItem button>
        <ListItemIcon> 
          <PersonOutlineOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Brukerprofil" />
      </ListItem>
      <Divider/>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <DescriptionOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Mine søknader" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemText primary="Eksempel søknad 1" />
          </ListItem>
        </List>
      </Collapse>
    </List>
      </Drawer>
  
    </div>
  );
}