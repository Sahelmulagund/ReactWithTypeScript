import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Image } from "@material-ui/icons";
import { Button, Typography } from "@material-ui/core";
import { NavigateFunction, useNavigate } from "react-router-dom";
const useStyles = makeStyles(theme=>({

    container:{
        display:'flex',
        
        justifyContent:'center',
        marginTop:'70px',
         
        
    },
    imgContainer:{
        flex:'2',
         
         
        
    },
    sidebar:{
        flex:'1',
         
        height:'100%',
       
         
    },
    title:{
        fontSize:'48px',
        fontWeight:800,
        color:'black',
        margin:'16px',
        padding:'24px'
        
    },
    subtitle:{
        fontSize:'32px',
        fontWeight:700,
        color:'black',
        margin:'16px',
        padding:'24px'
    },
    btn:{
        width:'250px',
        padding:'24px',
        fontSize:'18px',
        margin:'16px',
        fontWeight: 700,
        color:'#528AAE',
        cursor:'pointer'
         
    }
}));
 const ShowError = ():JSX.Element => {
  const classes = useStyles();
  const navigate:NavigateFunction = useNavigate();
  const gotoHome = () =>
        navigate({
            pathname: `/`,

        })
  const handleClick = () =>{
      gotoHome();
  }
    return(
        <div className={classes.container}>
            <div className={classes.imgContainer}>
                <Typography className={classes.title}>Oops!!!</Typography>
                <Typography className={classes.subtitle}>Couldn't find what you were looking for!</Typography>
                <Button   className={classes.btn} onClick={handleClick} >Search Another</Button>
             </div>
            <div className={classes.sidebar}>
            <img src="https://ouch-cdn2.icons8.com/3BoOw-ffk9M97jyvBrw4yz-JZoxs60ODIRxv8IAUQaM/rs:fit:427:456/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvODM1/LzJkYzVlOTZhLWNl/MTUtNGVlMi04MmZh/LTM0NzVmMmRhZDkw/Ny5zdmc.png" alt="Result Not Found"/>
            
            </div>
        </div>
    )
}

export default ShowError;

