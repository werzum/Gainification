import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const comparator = (prop, desc = true) => (a, b) => {  const order = desc ? -1 : 1;
    if (a[prop] < b[prop]) {    return -1 * order;  }
    if (a[prop] > b[prop]) {    return 1 * order;  }
    return 0 * order; };


export default function SortableTable(props){
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    //deactivate category on mobile
    let [columns, setColumns] = useState([{name:"Name", active: false},
                                            !isSmall&&{name:"Category", active:false},
                                            {name:"Price", active:false, numeric:true},
                                            {name:"Kcal", active:false, numeric:true},
                                            {name:"Protein(g)", active:false, numeric:true},
                                            {name:"Fat(g)", active:false, numeric:true},
                                            {name:"Carbs(g)", active:false, numeric:true}])

    if(isSmall){
        columns=columns.filter((elm)=>elm.name!=="Category");
    }
                
    
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
        <TableContainer component={Paper} key={rows[0].name} style={{marginTop:12}}>
            <Table size={isSmall?"small":"medium"}>
                <TableHead>
                    <TableRow>
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index)=>{
                        return(
                            <TableRow key={index}>
                                <TableCell key={index.toString()+row.uniqueID+"1"} component="th" scope="row">{row.name}</TableCell>
                                {!isSmall&&<TableCell key={index.toString()+row.uniqueID+"2"} align="left">{row.category}</TableCell>}
                                <TableCell key={index.toString()+row.uniqueID+"3"} align="right">{row.price+"0 €"}</TableCell>
                                <TableCell key={index.toString()+row.uniqueID+"4"} align="right">{row.kcal}</TableCell>
                                <TableCell key={index.toString()+row.uniqueID+"5"} align="right">{row.protein}</TableCell>
                                <TableCell key={index.toString()+row.uniqueID+"6"} align="right">{row.fat}</TableCell>
                                <TableCell key={index.toString()+row.uniqueID+"7"} align="right">{row.carbs}</TableCell>
                            </TableRow>
                    )})}
                </TableBody>
            </Table>
        </TableContainer>
    )

}