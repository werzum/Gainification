import React, {useState} from 'react';
import {Card, CardHeader, CardContent, CardActions, Collapse, IconButton} from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowDropUp from "@material-ui/icons/ArrowDropUp"
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({  card: {height: "100%"},
    expand: {    marginLeft: 'auto'  } }));

function HeadCardPpE(props) {
    //use the styles created above
    const classes = useStyles()
    //hooks for hovering effect and expanding cards
    const [isHovering, setIsHovering] = useState(0);
    const [expanded, setExpanded] = useState(0);

    const toggleExpand = () => {
        setExpanded(!expanded);
    }
  
    return (
        <Card onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        raised={Boolean(isHovering)} className={classes.card}
        > 

        <CardHeader title={props.name} subheader={props.subheadername}/>
        <CardContent >
            <p>Protein per Euro: {props.PpE} g/€</p>
            <p>Absolute protein: {props.protein} g</p>
            <p>Kcal per Euro: {props.KcalpE} kcal/€</p>
            <p>Absolute Kcal: {props.kcal} kcal</p>
        </CardContent>
        <CardActions>
            <IconButton className={classes.expand} onClick={toggleExpand}>
                {expanded? <ArrowDropUp expanded={expanded}/> : <ArrowDropDown expanded={expanded}/>}
            </IconButton>
        </CardActions>
        <Collapse in={Boolean(expanded)}>
            <CardContent>
                <p>Price: {props.price}€</p>
                <p>Gainfactor: {props.gainfactor}</p>
                <p>Absolute Carbs: {props.carbs}g</p>
                <p>Absolute Fat: {props.carbs}g</p>
            </CardContent>
        </Collapse> 
    </Card>
    )
  }

export default HeadCardPpE;