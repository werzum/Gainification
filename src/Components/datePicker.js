import {Button, Typography, Toolbar, IconButton} from '@material-ui/core';
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
// const handleClick = (func,day) => {

// }

function DatePicker(props){
    const classes = useStyles()

    return(
        <React.Fragment>
            <Button>
                <ArrowBack onClick={()=>props.previousDay(props.selectedDay)}/>
            </Button>
            <Typography>
                {props.dateTime}
            </Typography>
            <Button>
                <ArrowForward onClick={()=>props.nextDay(props.selectedDay)}/>
            </Button>
        </React.Fragment>
    )
}

export default DatePicker;