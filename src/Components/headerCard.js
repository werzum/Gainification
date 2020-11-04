import React, {useState} from 'react';
import {Card, CardHeader, CardContent, CardActions, Collapse, IconButton} from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowDropUp from "@material-ui/icons/ArrowDropUp"
import { makeStyles } from '@material-ui/styles'
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts';
  


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

    //the data and setup for the charts
    const fat = (props.fat)/22;
    const kcal = (props.kcal)/666;
    const protein = props.protein/24;
    const carbs = props.carbs/88;
    const colors=["#8884d8","#8884d8","#8884d8","#d0ed57"]
    const data = [
        {name: "Kcal", val: kcal, "fill": "#8884d8"},
        {name: "Protein", val: protein, "fill": "#83a6ed"},
        {name: "Fat", val: fat, "fill": "#8dd1e1"},
        {name: "Carbs", val: carbs, "fill": "#d0ed57"}
    ]
  
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
        <CardActions >
            <IconButton className={classes.expand} onClick={toggleExpand}>
                {expanded? <ArrowDropUp expanded={expanded}/> : <ArrowDropDown expanded={expanded}/>}
            </IconButton>
        </CardActions>
        <CardHeader subheader={"Percentage of recommended intake per meal"}/>
        <Collapse in={Boolean(expanded)}>
            <CardContent>
            <ResponsiveContainer width={"95%"} height={250}>
                <BarChart data={data}>
                        <YAxis ticks={[0.5,1,1.5,2]} interval={0} />
                        <XAxis dataKey="name"/>
                        <Tooltip/>
                        <Bar dataKey="val"/>{
                            data.map((entry, index)=>
                            <Cell fill={colors[index]}/>)
                        }
                    </BarChart>
            </ResponsiveContainer>

            </CardContent>
        </Collapse> 
    </Card>
    )
  }
  
export default HeadCardPpE;