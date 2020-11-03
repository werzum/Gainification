import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import ArrowDropUp from "@material-ui/icons/ArrowDropUp";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DarkToggle from "./toggle.js"

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

export default function CustomDrawer(props){
    const classes = useStyles();
    const [expanded, setExpanded] = useState(0);

    const toggleExpand = () => {
      setExpanded(!expanded);
  }

    const drawer = (
      <React.Fragment>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <ArrowDropUp /> : <ArrowDropUp />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
            <DarkToggle darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode}/>
          </List>
        </React.Fragment>
    );

    return (
        <div>
            <React.Fragment>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleExpand}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor={"left"} open={Boolean(expanded)} onClose={toggleExpand} ModalProps={{
              keepMounted: true, // Better open performance on mobile.
              }}>
                {drawer}
              </Drawer>
            </React.Fragment>
        </div>
      );
}
