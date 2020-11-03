import React, {useState} from 'react';
import {ListItem,Typography} from "@material-ui/core";

function MenuItem(props) {
    const [isHovering, setIsHovering] = useState(0);
  
    return (
        <ListItem onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        raised={isHovering.toString()}
        spacing={5}
        dense="true">
            <div>
            <Typography variant="overline">{props.name} - {props.price} €</Typography>
            <Typography variant="subtitle1">Protein per Euro: {props.PpE} g/€</Typography>
            <Typography variant="subtitle1">Absolute Protein: {props.protein} g</Typography>
            <Typography variant="subtitle1">Kcal per Euro: {props.KcalpE} kcal/€</Typography>
            <Typography variant="subtitle1">Absolute Kcal: {props.kcal} g</Typography>
            </div>
        </ListItem>
    )
  }

export default MenuItem;