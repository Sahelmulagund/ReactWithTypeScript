import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Question as IProp} from "../Quiz";

interface IReport{
    data:IProp,
    userAnswers:string,
    index:number

}
const useStyles = makeStyles(theme=>({
    question:{
        fontSize: "20px",
        fontWeight: 800,
        marginTop:"16px"
    },
    answer:{
        fontSize: "16px",
         fontWeight:600,
         


    },
    userAnswer:{
        fontSize: "18px",
        fontWeight:700,
        
        

    }

}))
const QuizReport:React.FC<IReport> = ({data, userAnswers, index})=>{
    const classes = useStyles();
    let answer:string = "";
    let corrAnswer:string = "";
    let arr = userAnswers.split(",")
    let corrArr = data.correctAnswer.split(',')
    corrArr.sort((a,b)=>a.localeCompare(b));
    arr.sort((a,b)=>a.localeCompare(b));
    answer = arr.join(',')
    corrAnswer = corrArr.join(',')

    if(answer[0] === ','){
        answer = answer.replace(',','')
    }

     let question = "";
     if(data.type === "match the following"){
         question = data.question.split(":")[0]
     }else if(data.type === "fill in the blanks"){
         question = data.question.replace("blank", "______");
     }
     
     else{
         question=data.question
     }

    return(
        <Container maxWidth="lg">
            <Typography  className={classes.question}>
              Q{index+1}. {question}?
            </Typography>
            <Typography color="inherit" className={classes.answer}>
                Ans. {data.correctAnswer.replaceAll(',',', ')}
            </Typography>
            <Typography color={answer.replaceAll(',','') === corrAnswer.replaceAll(',','').trim() ? "primary" : "secondary"} className={classes.userAnswer}>
                {answer}
            </Typography>
        </Container>
    )

}

export default QuizReport;