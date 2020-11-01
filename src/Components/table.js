import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const comparator = (prop, desc = true) => (a, b) => {  const order = desc ? -1 : 1;
    if (a[prop] < b[prop]) {    return -1 * order;  }
    if (a[prop] > b[prop]) {    return 1 * order;  }
    return 0 * order; };

const useStyles = makeStyles(theme => ({  root: { textAlign: 'center' } }));

export default function SortableTable(props){
    const classes = useStyles(); 
    //only compare by absolute value since the name comparator doesnt like spaces and /,€ -> fix this maybe? 
    const [columns, setColumns] = useState([{name:"Name", active: false},
                                            {name:"Category", active:false},
                                            {name:"Price", active:false, numeric:true},
                                            {name:"Kcal", active:false, numeric:true},
                                            {name:"Protein", active:false, numeric:true},
                                            {name:"Fat", active:false, numeric:true},
                                            {name:"Carbs", active:false, numeric:true}])
    
    //hook to update rows when prop is updated by parent- thanks, SO!
    const [rows, setRows] = useState(props.prop);
    useEffect(()=> {setRows(props.prop)},[props.prop]);

    const onSortClick = index => () => {
        setColumns(
            columns.map((column, i)=>({
                ...column,
                active: index === i,
                order:
                    (index === i &&
                        (column.order === "desc" ? "asc" : "desc")) || undefined
            }))
        );
        setRows(
            rows.slice().sort(
                comparator(
                    columns[index].name.toLowerCase(),
                    columns[index].order === "desc"
                )
            )
        )
    }

    return (
        <Paper key={rows[0].name}>
            <Table dense>
                <TableHead>
                {columns.map((column,index)=>{
                    return(
                        <TableCell key={column.name} align={column.numeric? "right" : "inherit"}>
                            <TableSortLabel active={column.active} direction={column.order} onClick={onSortClick(index)}>
                                {column.name}
                            </TableSortLabel>
                        </TableCell>
                        )
                    })
                }
                </TableHead>
                <TableBody>
                    {rows.map((row)=>{
                        return(
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="center">{row.category}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.kcal}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                            </TableRow>
                    )})}
                </TableBody>
            </Table>
        </Paper>
    )

}