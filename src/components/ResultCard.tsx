import { Card, CardContent, CardHeader, CardMedia, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import { PieChart } from 'react-minimal-pie-chart';
import { Question as IProp, Question } from "../Quiz";
import ShowError from "../utils/ShowError"
import QuizReport from "../components/QuizReport";
interface IQuiz{
    questionList:IProp[],
    userAnswer:string[],
    setUserAnswer:(args:string[])=>void
}

const useStyles = makeStyles(theme=>({
 container:{
     display:'flex',
      width:'90vw',
      
     
      
     marginTop:"20px",
     
 },
 mainBar:{
     flex:8,
     
     height:'inherit',
     padding:'24px'
     
 },
 topbar:{
     display:'flex',
     justifyContent:'space-around',
     alignItems:'center'
 },
 card:{
     flex:4,
     marginTop:'20px',
     padding:'16px',
     display:'flex',
     alignItems:'center',
     margin: '8px',
     justifyContent:'space-around'

 },
 title:{
     fontSize:"16px",
     fontWeight:400,

 },
 subtitle:{
    fontSize:"24px",
    fontWeight:800,
 },
 img:{
     height:"64px",
     width:'64px'
 },
 sidebar:{
     flex:4,
     display:'flex',
      
     padding:'8px',
     margin: '24px'
      

 },
 chart:{
   height:'400px',
    padding:'48px',
    display:'flex',
    alignItems:'center',
    margin: '24px',
     justifyContent:'center',

      
 },
 sideCard:{
   flex:2,
   display:'flex',


 }

}))
const ResultCard:React.FC<IQuiz> = ({questionList, userAnswer, setUserAnswer})=>{
    const classes = useStyles();

    const [correctAnswers, setCorrectAnswers] = useState<IProp[]>([]);
    const [wrongAnswers, setWrongAnswers] = useState<IProp[]>([]);

    console.log(questionList)
    useEffect(()=>{
        const resultCorrectAnswers = questionList.filter((q,idx) =>{
            try{
                if(q.type==="multi select"){
                    let strArr = userAnswer[idx].split(',');
                    let corrArr = q.correctAnswer.split(',')
                    strArr.sort((a,b)=>a.localeCompare(b))
                    corrArr.sort((a,b)=>a.localeCompare(b))
                    console.log("corrArr"+corrArr)
                    console.log("strArr"+strArr)
                    const strResult = strArr.join(',') 
                    const corrResult = corrArr.join(',').trim()
                    return strResult === corrResult
                }
                return q.correctAnswer === userAnswer[idx]
            }catch(err){
                return  q.correctAnswer === userAnswer[idx]
            }
         
        }
            )
        const resultWrongAnswers = questionList.filter((q,idx)=> {
            try{
            if(q.type==="multi select"){
                let strArr = userAnswer[idx].split(',');
                let corrArr = q.correctAnswer.split(',')
               
                strArr.sort((a,b)=>a.localeCompare(b))
                corrArr.sort((a,b)=>a.localeCompare(b))
                const strResult = strArr.join(',')
                const corrResult = corrArr.join(',').trim()
                 
                return  strResult !== corrResult
            }
            return q.correctAnswer !== userAnswer[idx]
        }catch(err){
            return q.correctAnswer !== userAnswer[idx]
        }
        })
       setCorrectAnswers(resultCorrectAnswers);
       setWrongAnswers(resultWrongAnswers);
    },[questionList, userAnswer])
   
    console.log(correctAnswers)
    console.log(userAnswer)

    return(
        <div className={classes.container}>
            <div className={classes.mainBar}>
                <Container className={classes.topbar}>
                    <Card className={classes.card}>
                        
                        <CardContent>
                        <Typography variant='h5' className={classes.title}>Name</Typography>
                            <Typography variant='h4' className={classes.subtitle}>User</Typography>
                            </CardContent>
                            <CardMedia component="img" className={classes.img} src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"/>
                    </Card>
                    <Card className={classes.card}>
                        
                        <CardContent>
                        <Typography variant='h5' className={classes.title}>Questions</Typography>
                            <Typography variant='h4' className={classes.subtitle}>{questionList.length}</Typography>
                            </CardContent>
                            <CardMedia component="img" className={classes.img} src="https://cdn-icons-png.flaticon.com/512/571/571685.png"/>
                    </Card>
                    <Card className={classes.card}>
                        
                        <CardContent>
                        <Typography variant='h5' className={classes.title}>Correct</Typography>
                            <Typography variant='h4' className={classes.subtitle}>{correctAnswers.length}</Typography>
                            </CardContent>
                            <CardMedia component="img" className={classes.img} src="https://cdn-icons.flaticon.com/png/512/4159/premium/4159588.png?token=exp=1643894018~hmac=23f1655e694123b6f884af690ee01c67"/>
                    </Card>
                    <Card className={classes.card}>
                        
                        <CardContent>
                        <Typography variant='h5' className={classes.title}>Wrong</Typography>
                            <Typography variant='h4' className={classes.subtitle}>{wrongAnswers.length}</Typography>
                            </CardContent>
                            <CardMedia component="img" className={classes.img} src="https://cdn-icons.flaticon.com/png/512/4461/premium/4461002.png?token=exp=1643894066~hmac=a23f069c0dcdd676c60beab2444ffa11"/>
                    </Card>
                </Container>
                <Card className={classes.chart}>
                    <CardContent >
                        <Typography variant='h4'>Your performance</Typography>
                        <Typography variant='h6' style={{marginTop:'20px', color:'#00b359'}} >&#11044; Correct Answers</Typography>
                        <Typography variant='h6' style={{marginTop:'20px', color:'#cc0000'}}>&#11044; Wrong Answers</Typography>
                    <PieChart
              animate
              animationDuration={1000}
              animationEasing="ease-out"
             
              data={[
                {
                color: "#00b359",
                title: "Correct Answers",
                value: correctAnswers.length,
                },
                {
                color: "#cc0000",
                title: "Wrong Answers",
                value: wrongAnswers.length,
                },
               
              ]}
             
              segmentsShift={(index)=> (index === 0 ? 7:0.5)}
              radius={PieChart.defaultProps.radius - 7}
               
              
              
              label={(data) =>( data.dataEntry.value/(questionList.length))*100+"%"}
              
              labelStyle={{
                fontSize: "8px",
                 
                fontWeight: "800",
              }}
            />

                       
                    </CardContent>
                </Card>

            </div>
            <div className={classes.sidebar}>
            <Card className={classes.sideCard}>
                <CardContent>
                    <Typography variant='h4' style={{padding:"8px"}}>Quiz Report</Typography>
                    {questionList.map((q:Question,idx)=>{
                        return <QuizReport data={q} userAnswers={userAnswer[idx]} index={idx}/>
                    })}
                </CardContent>
            </Card>
            </div>
            
        </div>
    )


}

export default ResultCard;