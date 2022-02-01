import { CircularProgress, makeStyles } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import CountryDetailCard from "../components/CountryDetailCard";
import NavBar from "../components/Navbar";
import "./Country.css"
import { AppService } from "../services/AppServices";
import  ShowError from "../utils/ShowError";

 
export interface ICountry{
    country:{
      capital:string
      population:number
      name:string
      latlng: Array<number>,
      flags:string,
       
     
 
      
    }[]
  }
 

function CountryDetails():JSX.Element {

    const [country, setCountry] = useState<ICountry["country"]>([]);
    const[isLoading, setIsLoading] = useState<boolean>(false);
    const[hasError,setHasError] = useState<boolean>(false);

    const countryName:string|undefined = useParams().name;
     
    
    
    useEffect(()=>{
        const appService:AppService = new AppService();
        const getCountry = async ()=>{
            setIsLoading(true);
            setHasError(false)
           try{
            const countryDetails = await appService.getCountryDetails(countryName as string);
            const data =  countryDetails.filter((res:any)=>res.name.toLowerCase() === countryName?.toLowerCase());
           
            setCountry(data);
            if(data.length === 0){
                setHasError(true)
               }
           }catch(error){
            setHasError(true)
               
           }
            
            // console.log(countryDetails);
            setIsLoading(false);
        
        };
        getCountry();
    },[countryName]);
 
  

    return (
        <div >
            
             {hasError && <div className="error"><ShowError/></div>}
            {
                isLoading?(
                   <div className="progress-box">
                <CircularProgress style={{margin:'auto auto',
                      display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                     height:'100%'
                     
                     }}/>
                   </div>
                  
                ):(country.map((data:any, idx)=>{
                    console.log(data)
                    return    <CountryDetailCard data={data} key={idx}/>
                    
                }))
            }
            
            
        </div>
    );
}

export default CountryDetails