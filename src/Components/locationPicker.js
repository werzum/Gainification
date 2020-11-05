import {Select, MenuItem} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => 
    ({  select: {color:"inherit", borderColor: "inherit",'&:before': {
        borderColor: "inherit",
    },
    '&:after': {
        borderColor: "inherit",
    }}
     }))

export default function LocationPicker(props){
    const classes = useStyles()
    return(
        <React.Fragment>
                <Select className={classes.select}
                key={props.selectedLocation}
                value={props.selectedLocation}
                onChange={(event)=>props.selectLocation(event.target.value)}
                label="Selected Mensa">
                    <MenuItem value={"academica"}> Mensa Academica </MenuItem>
                    <MenuItem value={"ahornstrasse"}> Mensa Ahornstraße </MenuItem>
                    <MenuItem value={"bayernallee"}> Mensa Bayernalle </MenuItem>
                    <MenuItem value={"eupenerstrasse"}> Mensa Eupener Straße </MenuItem>
                    <MenuItem value={"goethestrasse"}> Mensa Goethestraße </MenuItem>
                    <MenuItem value={"juelicherstrasse"}> Mensa Jülicher Straße </MenuItem>
                    <MenuItem value={"suedpark"}> Mensa Südpark </MenuItem>
                    <MenuItem value={"bistro"}> Bistro Templergraben </MenuItem>
                    <MenuItem value={"vita"}> Mensa Vita </MenuItem>
                </Select>
        </React.Fragment>
    )
}