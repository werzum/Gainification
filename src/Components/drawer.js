import {Drawer, List, Card, CardContent} from '@material-ui/core';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DarkToggle from "./toggle.js";

const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
      display: "flex",
      flexFlow: "column nowrap"
    },
    card:{
      width:"auto",
      marginTop: "auto"
    }
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
            <DarkToggle darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode}/>
          </List>
          <Card className={classes.card}>
            <CardContent>
                <pre>Made with <span role="img" aria-label="heart">❤️</span> by Carl Orge Retzlaff. </pre>
                <pre>Check out this project on <a href="https://github.com/werzum/mensaKnecht2.0">GitHub</a></pre>
            </CardContent>
          </Card>
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
