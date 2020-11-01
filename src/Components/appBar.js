import {AppBar, Typography, Toolbar} from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => 
    ({  root: {    flexGrow: 1  }, 
        flex: {    flex: 1  },
        title:{letterSpacing:4, fontWeight:800},
        caption: {alignContent: "end", flex:1, letterSpacing:9,fontWeight:700},
        toolbarMargin: {minHeight:56},
     }))

function CustomAppBar(){
    const classes = useStyles()
    return(
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Mensaknecht 
                    </Typography>
                    &nbsp;
                    &nbsp;
                    <Typography variant="caption" className={classes.caption}>
                       {"    "} Taste the Gainbow
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </React.Fragment>
    )
}

export default CustomAppBar;