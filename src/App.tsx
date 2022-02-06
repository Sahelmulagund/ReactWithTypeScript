import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
 
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useHref } from 'react-router-dom';
interface IFormInput{
  name:string,
  age:number,
  gender:string,
  language:string

}

export interface IUserDetail{
  fullname:string,
  age:number,
  gender:string,
  language:string
}

const schema = yup.object().shape({
  name:yup.string().required().min(2),
  age: yup.number().required().min(1),
  gender:yup.string().required().min(2),
  language: yup.string().required().min(2),

})

const useStyles = makeStyles((theme)=>({
  heading:{
    textAlign:"center",
    margin:theme.spacing(1,0,4),
  },
  submitButton:{
    marginTop:theme.spacing(4),
  }
  
}));

function App():JSX.Element {

  const {
    register,
     handleSubmit,
     formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const { heading, submitButton } = useStyles();

  const [json, setJson] = useState<string>();
   

  const navigate = useNavigate();
  const onSubmit = (data:IFormInput) =>{
    
    setJson(JSON.stringify(data));
    navigate('/quiz', { state : {data:data}});

  }
  return (
    <Container maxWidth="xs">
      <Typography className={heading} variant="h3">
       Fill in the form to play quiz!
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
        {...register("name")}
        variant="outlined"
        margin='normal'
        label="Full name"
        helperText={errors.name?.message}
        error={!!errors.name?.message}
        fullWidth
        required/>
         <TextField
        {...register("age")}
        variant="outlined"
        margin='normal'
        label="Age"
        helperText={errors.age?.message}
        error={!!errors.age?.message}
        fullWidth
        required/>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
         <Select
       {...register("gender")}
        variant="outlined"
        
        label="Gender"
         
        error={!!errors.gender?.message}
        fullWidth
        required>
          <MenuItem  
           value={"Male"}>
             Male
           </MenuItem>
           <MenuItem   
           value={"Female"}>
             Female
           </MenuItem>
           <MenuItem  
           value={"Other"}>
             Other
           </MenuItem>
        </Select>


        <InputLabel id="demo-simple-select-label">Language</InputLabel>
         <Select
       {...register("language")}
        variant="outlined"
        
        label="language"
         
        error={!!errors.language?.message}
        fullWidth
        required>
          <MenuItem  
           value={"JavaScript"}>
             JavaScript
           </MenuItem>
           <MenuItem   
           value={"TypeScript"}>
             TypeScript
           </MenuItem>
           <MenuItem  
           value={"Kotlin"}>
             Kotlin
           </MenuItem>
           <MenuItem  
           value={"Java"}>
             Java
           </MenuItem>
           <MenuItem  
           value={"Python"}>
             Python
           </MenuItem>
        </Select>

 
     

      
         <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={submitButton}
        
        >
          Play Quiz
        </Button>
        
        {json && (
          <>
            <Typography variant="body1">
              Below is the JSON that would normally get passed to the server
              when a form gets submitted
            </Typography>
            <Typography variant="body2">{json}</Typography>
          </>
        )}
      </form>
    </Container>
  );
}

export default App;
