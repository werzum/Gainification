import {AppBar, Typography, Toolbar} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DatePicker from "./datePicker.js";
import LocationPicker from "./locationPicker.js";

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:3, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

function CustomAppBar(props){
    const classes = useStyles()
    return(
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Gainification 
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="caption" className={classes.caption}>
                       {"    "} Taste the Gainbow
                    </Typography>
                    &nbsp;
                    <LocationPicker selectedLocation={props.selectedLocation} selectLocation={props.selectLocation}/>
                    <DatePicker selectedDay={props.selectedDay} dateTime={props.dateTime} nextDay={props.nextDay} previousDay={props.previousDay}/>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default CustomAppBar;