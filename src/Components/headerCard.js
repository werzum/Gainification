import React, {useState} from 'react';
import {Card, CardHeader, CardContent, Collapse, IconButton, Box, Avatar} from "@material-ui/core";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"
import ArrowDropUp from "@material-ui/icons/ArrowDropUp"
import { makeStyles } from '@material-ui/styles'
import { BarChart, Bar, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip} from 'recharts';
  


const useStyles = makeStyles(theme => ({  card: {height: "auto"},
    expand: {    marginLeft: 'auto', align: "right", padding: 0 },
    CardContent: {padding: 0, paddingLeft: 16} ,
    SubMenu:{padding:0, display:"flex", paddingBottom: 10,flexGrow: 1},
    CardContentNoPadding:{padding:0,flexGrow: 1},
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7), margin: 12
      }}));

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
    const colors=["#ffcc00","#ff884d","#ffcccc","#b35900"]
    const data = [
        {name: "Kcal", val: kcal, "fill": "#ffcc00"},
        {name: "Protein", val: protein, "fill": "#ff884d"},
        {name: "Fat", val: fat, "fill": "#ffcccc"},
        {name: "Carbs", val: carbs, "fill": "#b35900"}
    ]
  
    return (
        <Card onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        raised={Boolean(isHovering)} className={classes.card}
        > 
        
        <CardHeader titleTypographyProps={{variant:"h6"}} avatar={
            <Avatar className={classes.large}>{props.avatar}</Avatar>
            }
            title={props.name} subheader={props.subheadername}/>
        <CardContent className={classes.CardContent} >
            <p>Protein per Euro: {props.PpE} g/€</p>
            <p>Absolute protein: {props.protein} g</p>
            <p>Kcal per Euro: {props.KcalpE} kcal/€</p>
            <p>Absolute Kcal: {props.kcal} kcal </p>
            <div className={classes.SubMenu}>  
                <Box component="div" display="inline"><CardHeader  className={classes.CardContentNoPadding} subheader={expanded?"Share of recommended intake per meal":"Details"}/></Box>
                <Box component="div" display="inline" className={classes.expand}>
                    <IconButton  onClick={toggleExpand} style={{padding:0, paddingRight:6}}>
                        {expanded? <ArrowDropUp expanded={expanded}/> : <ArrowDropDown expanded={expanded}/>}
                    </IconButton>
                </Box>              
            </div>
            <Collapse in={Boolean(expanded)}>
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
            </Collapse> 
        </CardContent>
    </Card>
    )
  }
  
export default HeadCardPpE;