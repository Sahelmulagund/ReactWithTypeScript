import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
const useStyles = makeStyles(theme=>({
    root:{
        padding:'0px'
    },
    title:{
        fontSize: '24px',
        color:'white',
        fontWeight:700
        
    },


}));

const NavBar = () => {
    const classes: ClassNameMap = useStyles();

    return(
        <div className={classes.root}> 
        <AppBar position="static">
            <Toolbar>
                <Typography color="inherit" className={classes.title}>
                 React With Typescript
                </Typography>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;