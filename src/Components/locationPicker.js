import {Select, MenuItem} from '@material-ui/core';
import React from 'react';

export default function LocationPicker(props){
    return(
        <React.Fragment>
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
        </React.Fragment>
    )
}