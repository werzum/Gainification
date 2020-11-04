import {Switch} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness4Icon from '@material-ui/icons/Brightness4';

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:4, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

export default function DarkToggle(props){
    const classes = useStyles()

    return(
        <React.Fragment>
            <Switch checked={props.darkMode} onChange={props.toggleDarkMode}/>
            {props.darkMode? <Brightness4Icon fontSize={"large"}/> : <Brightness6Icon fontSize={"large"}/> }
        </React.Fragment>
    )
}