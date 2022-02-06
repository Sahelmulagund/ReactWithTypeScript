import React, { useState } from "react";
import { Card, CardContent, Checkbox, Container, FormControlLabel, makeStyles, Radio, RadioGroup, Typography } from "@material-ui/core";
import { Question as IProp } from "../Quiz";
import { number } from "yup";
import { string } from "yup/lib/locale";

const useStyles = makeStyles(theme=>({
 questionContainer:{
   
 }

}));

interface IData{
     
    data:IProp,
    userAnswer:any,
    currentQuestion:number,
    setCurrentQuestion:(args:number)=>void,
    setUserAnswer:(args:any)=>void,
    solvedIndex: number[],
    setSolvedIndex: (args:number[])=>void
}
 
const  QuizCard:React.FC<IData> = ({ data, userAnswer, currentQuestion, setCurrentQuestion, setUserAnswer, solvedIndex, setSolvedIndex})=>{
    const classes = useStyles();
    
    const [selected, setSelected] = useState<boolean[]>([]);
    let arrSelected = [...selected];

   

    const handleChange = (index:number, event:any, selectIdx:number)=>{
        
         
        console.log(event.target.value)
        
        let arr = [...userAnswer];
       
          
        if(data.type === "multi select"){
            if(selected[selectIdx]){
      
               arr[index] = userAnswer[index].trim().replace( event.target.value+",", '')  
               
                arrSelected[selectIdx] = false
                console.log(userAnswer[index])
                setSelected(arrSelected);
            
            }else{
                 
                if(userAnswer[index] !== undefined && !userAnswer[index].includes(event.target.value)){
                    let origString = userAnswer[index];
                    let stringToAdd =event.target.value+"," ;
                     
                    arr[index] =    origString+stringToAdd;
                }else if(userAnswer[index] !== undefined && userAnswer[index].includes(event.target.value)){
                    arr[index] = userAnswer[index].trim().replace(event.target.value+",", '')  
                     
                }
                else{
                    arr[index] =   event.target.value+"," 
                }
                
               
                
                arrSelected[selectIdx] = true;
                setSelected(arrSelected)
               
            }
             
            
        }else{
            
            arr[index] = event.target.value
        }
         
       
        setUserAnswer(arr);
        // arrSolvedIndex.push(currentQuestion)
        let arrInd = [...solvedIndex];
        arrInd[index] = currentQuestion;
        // setSolvedIndex(arrSolvedIndex);
        setSolvedIndex(arrInd)
    }
    let question =  data.question;
    let matchColArr1:string[] = [];
    let matchColArr2:string[] = [];
    if(data.type === "fill in the blanks"){
        question = data.question.replace("blank","_______")
    }else if(data.type === "match the following"){
         
       let arr =   data.question.split(":")
       let arr1 = arr[1].split("-")
       matchColArr1 = arr1[0].split(",")
       matchColArr2 = arr1[1].split(",");
       question =arr[0];
        
       
    }
    console.log(selected)
    

    return(
        <Container className={classes.questionContainer}>
            {data.type === "match the following"? (
                <Container>
                    <Typography variant="h4">{question}</Typography>
               
                     <Container style={{display:'flex',alignItems:'center'}}>
                      <Container>
                      {matchColArr1.map((l,i)=>{
                          return <Typography key={i} variant="h5">{l}</Typography>
                      })}
                      </Container>
                      <Container>
                      {matchColArr2.map((l,i)=>{
                          return <Typography key={i} variant="h5">{l}</Typography>
                      })}
                      </Container>
                    </Container>
                </Container>
                

            ): (<Typography variant="h4">{question}?</Typography>)}
            
           
      
 <RadioGroup
 aria-labelledby="demo-radio-buttons-group-label"
 aria-multiselectable="true"
 
 name="radio-buttons-group"
  
>
    
     
   {data.options.map((op,i)=>{
 return <FormControlLabel style={{marginTop:'12px',backgroundColor:'white', padding:'8px', borderRadius:'8px',boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}} value={op} checked={ data.type!=="multi select"? op === userAnswer[solvedIndex.indexOf(currentQuestion)] :  userAnswer[solvedIndex.indexOf(currentQuestion)] !== undefined && userAnswer[solvedIndex.indexOf(currentQuestion)].includes(op)  }   control={<Radio onClick={e=> handleChange(currentQuestion,e,i)} />} label={op} key={i} />
     
     })} 
  
 
  
</RadioGroup>
       
                     
                
            

        </Container>
    )

}
export default QuizCard;