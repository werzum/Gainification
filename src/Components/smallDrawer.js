import {Drawer, List, Card, CardContent, ListItem, ListItemAvatar, Avatar} from '@material-ui/core';
import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DarkToggle from "./toggle.js";
import DatePicker from "./datePicker.js";
import LocationPicker from "./locationPicker.js";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles({
    padding:{
        padding: 8
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

export default function SmallDrawer(props){
    const classes = useStyles();
    const [expanded, setExpanded] = useState(0);

    const toggleExpand = () => {
      setExpanded(!expanded);
  }

    const drawer = (
      <React.Fragment>
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <ArrowDropUp /> : <ArrowDropUp />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
             <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <LocationOnIcon/>
                </Avatar>
                </ListItemAvatar>
                <LocationPicker selectedLocation={props.selectedLocation} selectLocation={props.selectLocation}/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <TodayIcon/>
                    </Avatar>
                </ListItemAvatar>
                <DatePicker selectedDay={props.selectedDay} dateTime={props.dateTime} nextDay={props.nextDay} previousDay={props.previousDay} className={classes.padding}/>
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        D
                    </Avatar>
                </ListItemAvatar>
                <DarkToggle darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} className={classes.padding}/>
            </ListItem>
            
            
            
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
