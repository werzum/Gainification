import {AppBar, Typography, Toolbar, Box} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DatePicker from "./datePicker.js";
import LocationPicker from "./locationPicker.js";
import CustomDrawer from "./drawer.js";

const useStyles = makeStyles((theme) => ({
    color:{
        backgroundColor: "#ED6B5A"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),flexGrow: 1
    },
    title: {
      
    },
  }));

     export default function CustomAppBar(props){
    const classes = useStyles()
    return(
            <AppBar position="sticky" className={classes.color}>
                <Toolbar>
                    <CustomDrawer darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} className={classes.menuButton}/>
                    <Typography variant="h5" className={classes.menuButton}>
                        Gainification 
                    </Typography>
                    <LocationPicker selectedLocation={props.selectedLocation} selectLocation={props.selectLocation}/>
                    <DatePicker selectedDay={props.selectedDay} dateTime={props.dateTime} nextDay={props.nextDay} previousDay={props.previousDay} className={classes.title}/>

                </Toolbar>
            </AppBar>
    )
}