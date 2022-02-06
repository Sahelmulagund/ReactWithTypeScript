import { Button, Container, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { clearTimeout } from "timers";

import QuizCard from "./components/QuizCard"
import ResultCard from "./components/ResultCard";
import TotalQuestions from "./components/TotalQuestions";
export interface Question{
    question:string,
    options:string[],
     
    correctAnswer:string,
    type:string,
    
    

}

const javaScriptQuiz:Question[] = [
    {
        question:"What is question",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"mcq",
         
    },
    {
        question:"What is question",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"multi select",
        
    },
    {
        question:"What is question",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"mcq",
       
    },

];
const TypeScriptQuiz:Question[] = [
    {
        question:"What is blank question1",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"fill in the blanks",
        
    },
    {
        question:"Match the following: List I, A. a match, B. b match, C. c match, D. d match - List II, 1. answer1, 2. answer2, 3. answer3, 4. answer4",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"match the following",
    
    },
    {
        question:"What is question3",
        options: ["true", "false"],
        correctAnswer:"false",
        type:"true/false",
        
    },
    {
        question:"What is question4",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA,optionB, ",
        type:"multi select",
        
    },
    {
        question:"What is question5",
        options: ["optionA", "optionB", "optionC", "optionD"],
        correctAnswer:"optionA",
        type:"mcq",
    
    },
     
   
    

];

const useStyles = makeStyles(theme=>({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
       
        padding:'16px'

    },
    mainContainer:{
        flex:8,
        display:'flex',
        flexDirection:'column',
        
        alignItems:'center',
        justifyContent:'center',
        marginTop:'20px'
    },
    topbar:{
      flex:2,
      height:'inherit',
      alignItems:'center',
      display:'flex',
      justifyContent:'center',
       

    },
    quizContainer:{
        flex:8,
         marginTop:'30px'
        
    },
    totalQuestions:{
        flex:2,
      
        height:'100px',
        alignItems:'center',
        justifyContent:'center',
        
        
        display:'flex'
        
    },
    timer:{
        flex:2,
       
        height:'100px',
        alignItems:'center',
        justifyContent:'center',
      
       
        display:'flex'

    },
    questionNumber:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
         
         flex:5,
          
        
    },
    sidebar:{
        flex:4,
        display:'flex',
        flexDirection:'column',
        marginTop:'80px',
        backgroundColor:'whitesmoke',
        padding:'16px',
        borderRadius:'8px'

    },
    heading:{
        fontSize:"20px",
        fontWeight:700,
    },
    btnContainer:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:'40px'
    },
    readyContainer:{
        display:'flex',
        flexDirection:'column',
        height:"100vh",
        alignItems:'center',
        justifyContent:"center",
        padding:'24px',
        

    },
    ready:{
        fontSize:"32px",
        padding:'24px',
        fontWeight:800

    },
   
   }));

   
 const Quiz:React.FC = ():JSX.Element=>{
     const data = useLocation();
    const [user, setUser] = useState<any>(data.state)
    const [userAnswer, setUserAnswer] = useState<any>("")
    const [quiz, setQuiz] = useState<Question[]>([]);
    const [ solvedIndex, setSolvedIndex ] = useState<number[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [timer, setTimer] = useState(300)
    const [quizStart, setQuizStart] = useState(false);
    const [quizAnswered,setQuizAnswered] = useState(false);
    const [currentQuiz,setCurrentQuiz]  = useState<Question>({
        question:"",
        options:[],
        correctAnswer: "",
        type:""

    });
    // console.log(user.data);
    // const secondPassed = useCallback(()=>{
    //     const cur_date = new Date( Date.now() - 1000 * 60 );
    //     const minutes = cur_date.getMinutes();
    //     const seconds = cur_date.getSeconds();
    //     console.log( (0 - (minutes % 1)) + ":" + (seconds >= 50 ? "0" : "") + (59 - seconds))
    //     setTimer( `${(0 - (minutes % 1)) + ":" + (seconds >= 50 ? "0" : "") + (59 - seconds)}` )

    // }, [])

    

    useEffect(()=>{
        if(quizStart){
        if(timer > 0 ){
            setTimeout(()=>setTimer(timer - 1), 1000)
           
            
             
        }else{
            setQuizAnswered(true);
            setQuizStart(false);
        }
    }

      },[quizStart,timer])
      const navigate = useNavigate();
    useEffect(()=>{
        if(data.state === null){
            // eslint-disable-next-line no-restricted-globals
             if(confirm("Please provide your details first")){
                 navigate("/")


            }else{
                navigate("/")
            }
          return
        }
      if(user.data.language === "TypeScript"){
          setQuiz(TypeScriptQuiz);
        setCurrentQuiz(TypeScriptQuiz[currentQuestion]);

        
    }
    },[currentQuestion,user,navigate,data])
    

    const nextClick = ()=>{
        if(currentQuestion !== quiz.length-1){
            setCurrentQuestion(currentQuestion+1);
        }
    }
    const previousClick = ()=>{
        if(currentQuestion !== 0){
            setCurrentQuestion(currentQuestion-1);
        }
    }

    solvedIndex.map((ind)=>{
        return console.log(ind)
    });
    
    const handleChange = ()=>{
        setQuizStart(true);
    }
    
    // const currentQuiz:Question = quiz.find((q,i)=> i=== currentQuestion) as Question;
    const classes = useStyles();
    console.log(currentQuiz)
    console.log(userAnswer)
    const submitQuiz = ()=>{
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure you want to submit?")){
            setQuizStart(false)
            setQuizAnswered(true)
          
        } 
    }

    const dateObj = new Date(timer * 1000);
    const minutes = dateObj.getUTCMinutes()
    const seconds = dateObj.getUTCSeconds();
    let minuteString=""
    let secondString = ""
    if(minutes < 10){
        minuteString = "0"+minutes
    }else{
        minuteString = `${minutes}`
    }
    
    if(seconds < 10){
        secondString = "0"+seconds
    }else{
        secondString = `${seconds}`
    }
    return(
        <div>
        { 
            quizStart?(
            <Container className={classes.container}>
            <Container maxWidth="lg"   className={classes.mainContainer}>
               <Container     className={classes.topbar}>
                   <Container className={classes.totalQuestions}>
                    <Typography variant="h4">{currentQuestion+1}/{quiz.length}</Typography>
                   </Container>
                   <Container className={classes.questionNumber}>
    
                   
                    {quiz.map((q:Question,idx:number)=>{
                        return <TotalQuestions index={idx} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} key={idx} userAnswer={userAnswer} setUserAnswer={setUserAnswer}/>
                    })}
                    </Container>
                    <Container className={classes.timer}>
                    <Typography style={{display:'flex', alignItems:'center',
                   padding:'8px'}} variant="h5"><img style={{ marginRight:'8px', height: '48px', width:'48px'}} src="https://cdn-icons.flaticon.com/png/512/2838/premium/2838590.png?token=exp=1643965736~hmac=beeaba4c79b2a564346761d8fcc119fe" alt="time remaining"></img>{minuteString}:{secondString}</Typography>
                    </Container>
    
               </Container>
    
    
               <Container className={classes.quizContainer}>
                   
               <QuizCard  data={currentQuiz}  userAnswer={userAnswer} currentQuestion={currentQuestion} setCurrentQuestion={ setCurrentQuestion } setUserAnswer={setUserAnswer} solvedIndex={solvedIndex}  setSolvedIndex={setSolvedIndex} key={currentQuestion}/>
               <Container className={classes.btnContainer}>
                   {currentQuestion !== 0 && <Button variant="contained" color="primary" onClick={previousClick}>Previous</Button> }
                   
                   {currentQuestion !== quiz.length-1 && <Button variant="contained" color="primary" onClick={nextClick}>Next</Button>}
               </Container>
                 </Container>
               
                
                
                
            </Container>
            <Container maxWidth="sm" className={classes.sidebar}>
                {/* <Typography className={classes.heading} variant="h6">Your details</Typography>
    
                <Typography variant="h6" style={{marginTop:'16px'}}>Name: {user.data.name}</Typography>
                <Typography variant="h6" style={{marginTop:'16px'}}>Age: {user.data.age}</Typography>
                <Typography variant="h6" style={{marginTop:'16px'}}>Gender: {user.data.gender}</Typography>
                <Typography variant="h6" style={{marginTop:'16px'}}>Language: {user.data.language}</Typography> */}
                <Button variant="contained" color="secondary" style={{marginTop:"20px"}} onClick={submitQuiz}>Submit Quiz</Button>
            </Container>
            
            </Container> 
        ): !quizAnswered?(
          <Container maxWidth="lg" className={classes.readyContainer}>
              <Typography variant="h3" className={classes.ready}>Are you ready to start the quiz?</Typography>
                 <Button variant="contained" color="primary" onClick={handleChange}>Start Quiz</Button>
          </Container>
        ):(
        <Container maxWidth="lg" className={classes.readyContainer}>
        <Typography variant="h3" className={classes.ready}><ResultCard questionList={quiz} userAnswer={userAnswer} setUserAnswer={setUserAnswer}/></Typography>
          
    </Container>
    )
        }
        </div> 
    )


}

export default Quiz;