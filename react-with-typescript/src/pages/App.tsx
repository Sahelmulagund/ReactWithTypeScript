import React from 'react';
import './App.css';
import List from "../components/Lists";
 

export interface IState{
  people:{
   name:string
   age:number
   url:string
   note:string
  }[]
} 


function App():JSX.Element {

  
   
  
    

  return (
    <div className="App">
       
     <List></List>
     {/* <AddToList people={people} setPeople={setpeople}></AddToList> */}

    </div>
  );
}

export default App;
