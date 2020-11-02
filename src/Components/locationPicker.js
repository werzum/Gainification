import {Select, FormControl, MenuItem} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:4, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

export default function LocationPicker(props){
    const classes = useStyles()

    return(
        <React.Fragment>
            <FormControl variant="outlined">
                <Select
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
            </FormControl>
        </React.Fragment>
    )
}