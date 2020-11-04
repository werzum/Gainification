import {Switch} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles(theme => 
    ({  switch: {verticalAlign: "top"}
     }))

export default function DarkToggle(props){
    const classes = useStyles()

    return(
        <React.Fragment>
            <Switch checked={props.darkMode} onChange={props.toggleDarkMode} className={classes.switch}/>
            {props.darkMode? <Brightness4Icon fontSize={"large"}/> : <Brightness6Icon fontSize={"large"}/> }
        </React.Fragment>
    )
}