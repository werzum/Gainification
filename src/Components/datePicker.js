import {Button, Typography} from '@material-ui/core';
import React from 'react';
import {ArrowForward, ArrowBack} from "@material-ui/icons"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:4, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

export default function DatePicker(props){
    const classes = useStyles()

    return(
        <React.Fragment>
            <Button onClick={()=>props.previousDay(props.selectedDay)}>
                <ArrowBack color={props.selectedDay===0? "disabled" : "inherit"}/>
            </Button>
            <Typography>
                {props.dateTime}
            </Typography>
            <Button onClick={()=>props.nextDay(props.selectedDay)}>
                <ArrowForward color={props.selectedDay===6? "disabled" : "inherit"}/>
            </Button>
        </React.Fragment>
    )
}