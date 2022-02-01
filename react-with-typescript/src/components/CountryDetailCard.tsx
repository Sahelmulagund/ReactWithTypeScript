import { Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppService } from "../services/AppServices";
 
const useStyles = makeStyles(theme=>({
    

    root:{
         
        width: '50%',
        
        margin:'16px',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        flexDirection:'column'

       
         
        

    },
    img:{
        width:'350px',
        height: '200px',
        objectFit:'cover',
        margin:'8px',
        border:'solid',
        borderRadius:'8px'
        
    },
    headerContainer:{
        display:'flex',
        justifyContent: 'space-evenly',
        alignItems:'center',
        transition: 'transform 0.8s',
       transformStyle: 'preserve-3d'
    },
    
    title:{
        fontSize: '20px',
        fontWeight:800,
         

    },
    gridContainer:{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridGap:'5px',
        margin:'10px',
        justifyContent: 'space-around',
        alignItems:'center'

    },
    card:{
        width:'250px',
        backgroundColor: 'white',
        padding: '16px',
        marginTop:'20px'
        
        
    },
    subtitle: {
        fontWeight: 700,
        fontSize: '16px',
        marginTop:'16px'
    },
    btn:{
        width:'100%'
    },
   name:{

    fontWeight:800,
    fontSize:'18px',
    padding: '4px'
   },
    time:{
        fontWeight:700,
        fontSize:'16px',
        padding: '4px'
    },
    temp:{
        fontSize:'28px',
        fontWeight:900
    },

    tempImg:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-between'
    },
    icon:{
        height:'80px',
        width:'80px'
    },
    weatherCard:{
        width:'450px',
        margin:'0 auto',
        marginTop:'50px'
    },
    windSpeed:{
        fontSize:'16px',
        fontWeight:700
    },
    weatherDesc:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column'

    }
}));
 export default function CountryDetailCard({data}:{data:any}):JSX.Element {
    const classes = useStyles();
    const [showWeather, setShowWeather] = useState<boolean>(false);
    const [weather, setWeather] = useState<any>({});
    console.log(weather)
  
        
        useEffect(()=>{
            const appService:AppService = new AppService();
            const getWeather = async ()=>{
            
                try{
                 const weatherDetails = await appService.getWeather(data.capital);
                 
                
                 setWeather(weatherDetails);
                 
                }catch(error){
                  console.log(error)
                    
                }
                 
                 // console.log(countryDetails);
               
             
             };
             getWeather();

        },[data])
      
         
        const navigate:NavigateFunction = useNavigate();
        const gotoHome = () =>
              navigate({
                  pathname: `/`,
      
              })
    const handleClick = () =>{
        setShowWeather(true);
         
    }
    
        
    return(
        <div >
            {
                !showWeather?(
        <div className={classes.headerContainer}>

        
        <Card className={classes.root}>
            <CardMedia 
            component="img"
           
            className={classes.img}
            image={data.flag}
            alt="flag"
           
            >

            </CardMedia>
            <Typography className={classes.title}>{data.name}</Typography>
            <CardContent  >
                    <Typography className={classes.subtitle}  >Capital</Typography>
                    <Typography className={classes.title}  >{data.capital}</Typography>
                    <Typography className={classes.subtitle} >Population</Typography>
                    <Typography className={classes.title} >{data.population}</Typography>
                    <Typography className={classes.subtitle}  >Lat-Lng</Typography>
                    <Typography className={classes.title}  >{data.latlng[0]},  {data.latlng[1]}</Typography>

                </CardContent>
                <Button variant="contained" color="primary" className={classes.btn}onClick={handleClick}>Capital Weather</Button>
        </Card>
        </div>
                ):(
                   
                    <div className={classes.weatherCard}>
                     <Card>
                         <CardContent>
                             <Typography className={classes.name}>{weather.location.name}</Typography>
                             <Typography className={classes.time}>{weather.location.localtime}</Typography>
                             <div className={classes.tempImg}>
                             <Typography className={classes.temp}>{weather.current.temperature}<sup>o</sup>C</Typography>
                             <div className={classes.weatherDesc}>

                            
                             <CardMedia className={classes.icon} component="img" image={weather.current.weather_icons[0]}/>
                             <Typography className={classes.time}>{weather.current.weather_descriptions[0]}</Typography>
                             </div>
                             </div>
                            
                            
                             <Typography className={classes.windSpeed}>Wind speed: {weather.current.wind_speed} km/h</Typography>
                             
                         </CardContent>
                     </Card>
                     <Button variant="contained" color="secondary" style={{marginTop:'50px'}} className={classes.btn} onClick={gotoHome} >Go Back</Button>
                    </div>
                )
        }
       
    </div>

    );

}

