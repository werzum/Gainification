import {Button, ButtonGroup, Popper, Paper, 
        ClickAwayListener, MenuItem, MenuList} from '@material-ui/core';
import React from 'react';
import {ArrowDropDown} from "@material-ui/icons"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:4, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

const locationOptions = ["Bistro Templergraben","Mensa Bayneralle","Mensa Goethestraße","Mensa Eupener Straße",
"Mensa Südpark","Mensa Jülich"]

export default function LocationPicker(props){
    const classes = useStyles()

    //stuff for the popOver menu
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const anchorRef = React.useRef(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };
      const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
        setOpen(false);
      };
    const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    };

    return(
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef}>
                <Button onClick={()=>props.selectLocation("academica")} size={props.selectedLocation==="academica"? "large" : "small"}>
                    Academica
                </Button>
                <Button onClick={()=>props.selectLocation("vita")} size={props.selectedLocation==="vita"? "large" : "small"}>
                    Vita
                </Button>
                <Button onClick={()=>props.selectLocation("ahornstrasse")} size={props.selectedLocation==="ahornstrasse"? "large" : "small"}>
                    Ahornstraße
                </Button>
                <Button onClick={handleToggle}>
                    <ArrowDropDown/>
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} disablePortal>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                        {locationOptions.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 2}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                        ))}
                    </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </React.Fragment>
    )
}