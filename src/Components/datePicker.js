import {Button, Typography, Grid} from '@material-ui/core';
import React from 'react';
import {ArrowForward, ArrowBack} from "@material-ui/icons";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function DatePicker(props){

    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Grid container direction="row" alignItems="center" style={{minWidth:100}}>
            <Grid item style={isSmall?{marginLeft:-10}:{marginLeft:0}}>
            <Button onClick={()=>props.previousDay(props.selectedDay)}>
                <ArrowBack color={props.selectedDay===0? "disabled" : "inherit"}/>
            </Button>
            </Grid>
            <Grid item>
               <Typography>
                {isSmall? props.dateTime.replace(/[A-Za-z]/g,"").replace(",",""): props.dateTime}
            </Typography> 
            </Grid>
            <Grid item>
                <Button onClick={()=>props.nextDay(props.selectedDay)}>
                    <ArrowForward color={props.selectedDay===6? "disabled" : "inherit"}/>
                </Button>

            </Grid>
            
        </Grid>
    )
}