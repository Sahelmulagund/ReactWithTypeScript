import React, { useState } from "react";
// import {IState as IProp} from "../App";
import {  makeStyles } from '@material-ui/core';
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Button from '@material-ui/core/Button';
import { AppService } from "../services/AppServices";
 
import { NavigateFunction, useNavigate } from "react-router-dom";


const useStyles = makeStyles(theme=>({
    root:{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: '30%',
        marginTop: '100px',
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '16px',
        boxShadow: `0px 7px 29px 0px rgba(100, 100, 111, 0.2)`,

       
        
    },
    country:{
        padding: '8px',
        margin: '8px',     
        fontSize: '16px',
        color: 'black',
        borderRadius: '8px',
      },

      
}));

 
const List  = ():JSX.Element =>{
    const classes:ClassNameMap = useStyles();

    

    const[countryName, setCountryName] = useState({
        name:"",
    });
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void  =>{
      setCountryName({
          ...countryName,
          [e.target.name]:e.target.value,
      })

  }
    

   
    const navigate:NavigateFunction = useNavigate();
    const goToDetails = (name:string) =>
        navigate( `/${name}`,)
    
     const handleClick = ():void=>{
         if(countryName.name.trim().length === 0){
             alert('Country name cannot be empty!');
         }else{
        
            goToDetails(countryName.name);
         }
       


     }
    // const renderList = (): JSX.Element[] =>{
    //     return people.map((person)=> {
    //        return (
    //         <li className="List">
    //         <div className="List-header">
    //             <img className="List-img" src={person.url} alt="person"></img>
    //             <h2>{person.name}</h2>
    //         </div>
    //         <p>{person.age} years old</p>
    //         <p className="List-note">{person.note}</p>
    //     </li>
    //        );
    //     });
    // }
    return (
        <div className="country-box">
            <h2>Enter your favourite country name to get the details</h2>
            <form className={classes.root}>
            <input data-test="country-name" className={classes.country} placeholder="country name" 
             name="name"onChange={handleChange} value={countryName.name}></input>
             <Button variant="contained" color="primary" onClick={handleClick}>Submit</Button>
            
            </form>
        </div>
    )
}

export default List