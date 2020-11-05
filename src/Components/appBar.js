import {AppBar, Typography, Toolbar, Grid} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import DatePicker from "./datePicker.js";
import LocationPicker from "./locationPicker.js";
import CustomDrawer from "./drawer.js";
import SmallDrawer from "./smallDrawer"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    color:{
        backgroundColor: "#ED6B5A"
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),flexGrow: 1
    }
  }));

export default function CustomAppBar(props){
    const classes = useStyles()
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    return(
            <AppBar position="sticky" className={classes.color}>
                <Toolbar>
                    {isSmall?
                    <React.Fragment>
                        <SmallDrawer darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} className={classes.menuButton} 
                        selectedLocation={props.selectedLocation} selectLocation={props.selectLocation}
                        selectedDay={props.selectedDay} dateTime={props.dateTime} nextDay={props.nextDay} previousDay={props.previousDay}/>
                        <Typography variant="h5" className={classes.menuButton}>
                            Gainification 
                        </Typography>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <CustomDrawer darkMode={props.darkMode} toggleDarkMode={props.toggleDarkMode} className={classes.menuButton}/>
                        <Typography variant="h5" className={classes.menuButton}>
                        Gainification 
                        </Typography>
                        <LocationPicker selectedLocation={props.selectedLocation} selectLocation={props.selectLocation}/>
                        <DatePicker selectedDay={props.selectedDay} dateTime={props.dateTime} nextDay={props.nextDay} previousDay={props.previousDay}/>
                    </React.Fragment>
                    }
                </Toolbar>
            </AppBar>
    )
}