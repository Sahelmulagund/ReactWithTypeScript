import { Button, Container, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { IUserDetail } from "../App";


interface ISetCurrentQuestion{
    index:number,
    currentQuestion:number,
    setCurrentQuestion:(args:number)=>void,
    userAnswer:string[],
    setUserAnswer:(args:string[])=>void
}


const useStyles= makeStyles(theme=>({

    

    btn:{
        borderRadius:'50px',
         width:'80px',
         height:'80px',
        marginLeft:'16px',
        fontSize:'24px',
        float:'none',
        display:'inline-block',
        zoom:1,
         


    }
}));


const TotalQuestions:React.FC<ISetCurrentQuestion> = ({index, currentQuestion, setCurrentQuestion, userAnswer, setUserAnswer}) => {

    const classes = useStyles();
    const [active, setActive] = useState(false);
    const [current, setCurrent] = useState(false);
     const handleClick = ()=>{
        setCurrentQuestion(index);
     }
    useEffect(()=>{
        if(index === currentQuestion){
            setCurrent(true)

        }else{
            setCurrent(false)
        }
        if(userAnswer[index] !== undefined && userAnswer[index].length !== 0){
            setActive(true);
        }else{
            setActive(false);
        }
    },[index,currentQuestion, userAnswer])

    return (
        <Button onClick={handleClick} className={classes.btn} variant="contained" color={current ? "primary" : active ? "secondary" : "default"}>
            {index+1}
        </Button>
    )

}

export default TotalQuestions;