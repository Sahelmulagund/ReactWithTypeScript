import React, { useState } from "react";


import {IState as Props} from "../pages/App";


interface IProps{
  
    setPeople:React.Dispatch<React.SetStateAction<Props["people"]>>
    people:Props["people"]
}
const AddToList:React.FC<IProps> = ({people,setPeople}) =>{

    const[input,setInput] = useState({
        name:"",
        age:"",
        url:"",
        note:"",
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>):void =>{
       setInput({
        ...input,
        [e.target.name]:e.target.value
       });

    }
    const handleClick = ():void=>{

        if(!input.name || !input.age) return

        setPeople([
            ...people,
            {
                name: input.name,
                age: parseInt(input.age),
                url: input.url,
                note: input.note
            }
        ]);

        setInput({
            name: "",
            age: "",
            url: "",
            note: ""
        })

    }
    return (
        <div>
               <input 
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="name"
                value={input.name}
                placeholder="Name"
            />
            <input 
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="age"
                value={input.age}
                placeholder="Age"
            />
            <input 
                type="text"
                onChange={handleChange}
                className="AddToList-input"
                name="url"
                value={input.url}
                placeholder="Image Url"
            />
            <textarea
               
                className="AddToList-input"
                onChange={handleChange}
                name="note"
                value={input.note}
                placeholder="Note"
            />
            <button
                onClick={handleClick}
                className="AddToList-btn"
            >
                Add to List
            </button>
        </div>
    )
}
export default AddToList;