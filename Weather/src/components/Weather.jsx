import React, { useEffect, useRef, useState } from 'react'
import searchimg from './../assets/searchimg.png'
import clear from './../assets/clear.png'
import humidity from './../assets/humidity.png'
import wind from './../assets/wind.jpg'
import cloud from './../assets/cloud.png'
import snow from './../assets/snow.png'
import drizle from './../assets/drizle.png'
import rain from './../assets/rain.png'

const Weather = () => {

  const inputRef=useRef()

  const[weatherData,setweatherData] =useState(false);

  const allicons={
  
    "01d":clear,
    "01n":clear,
    "02d":cloud,
    "02n":cloud,
    "03d":cloud,
    "03n":cloud,

    "04d":drizle,
    "04n":drizle || clear,

    "09d":rain,
    "09n":rain,
    "10d":rain,
    "10n":rain,

    "13d":snow,
    "13n":snow,

  }
//promisses,then,async await
//useeffect,fetch api
  const search =async (city) =>{
    if(city===""){
      alert("Enter city name");
      return;
    }

    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;



      const response=await fetch (url);
      const data = await response.json ();

      if(!response.ok){
        alert(data.message)
        return;
      }





      console.log(data);
      const icon = allicons[data.weather[0].icon] || clear;

      setweatherData({
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  temperature: Math.floor(data.main.temp - 273.15), // Convert Kelvin to Celsius
  location: data.name,
  icon: icon
})


    }catch(error){

    }
  }

  useEffect(()=>{
    search("");
  },[])
  return (
    <div className='flex items-center flex-col justify-center bg-white shadow-lg rounded-xl w-[350px] h-[700px] md:w-[400px] md:h-[700px] lg:w-[450px] lg:h-[800px]  '>
    
      <div className='flex p-[15px]  '>
        
       <input
  type="text"
  placeholder="Search your location"
  ref={inputRef}
  className="rounded-[10px] bg-white w-[200px] h-[35px] border-none outline-blue-700 px-3"
/>
       
        <img src={searchimg} alt="search image" className='w-[35px] h-[35px] md:w-[40px] md:h-[40px]' onClick={()=>search(inputRef.current.value)}/>
    
      </div>

    {weatherData ? <>
  <img src={weatherData.icon} alt="Weather Icon" className='w-[150px] m-[30px]'/>
  <p className='text-[60px]'>{weatherData.temperature}</p>
  <p className='text-[25px]'>{weatherData.location}</p>

      <div className='p-[30px] flex flex-row gap-10 text-blue-800'> 
         <div className='flex flex-col p-'>
        <img src={humidity} alt="humidity image" className='w-[40px] h-[40px]' />
        <div className='text-[20px]'>
          <p >{weatherData.humidity}%</p>
          <span>humidity</span>
        </div>
      </div>

       <div className='flex flex-col'>
        <img src={wind} alt="wind image" className='w-[40px] h-[40px]' />
        <div className='text-[20px]'>
          <p>{weatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
      </div></>:<></>
       //conditional rendering
        }
    
    

   
    </div>
  )
}

export default Weather