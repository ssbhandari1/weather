import { useEffect, useState } from 'react'

import './style.scss'
import rainyBg from './assets/rainy.webp'
import cloudbg from './assets/cloud.jpg'
import clearbg from './assets/clear.jpg'
import hotBg from './assets/hot.avif'
import snowbg from './assets/snow.jpg'

import {fetchWeatherApiData, fetchCurrentLocation } from './utils/api'
import { Button, CardMedia, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Descriptions from './component/Discription'
import ErrorPage from './component/ErrorPage'
import Loading from './component/Loading'



function App() {
const [city,setcity]=useState(null)
const [units,setUnits]=useState('metric')
const [weather,setWeather]=useState(null)
const [search ,setSearch]=useState('')
const[error,setError]=useState(null)
const [loading,setloading]=useState(false)



//for weathrer condition
const clouds=['few clouds','scattered clouds','broken clouds','overcast clouds']
const thunderstorm =['thunderstorm with light rain','thunderstorm with rain	','thunderstorm with heavy rain	','light thunderstorm	','thunderstorm','heavy thunderstorm','ragged thunderstorm','thunderstorm with light drizzle','thunderstorm with drizzle','thunderstorm with heavy drizzle'
,'light intensity drizzle	','drizzle','heavy intensity drizzle	','light intensity drizzle rain	','drizzle rain','heavy intensity drizzle rain','shower rain and drizzle','heavy shower rain and drizzle','shower drizzle']

const snow=['light snow	','snow','heavy snow','sleet','light shower sleet','shower sleet','light rain and snow','rain and snow','light shower snow','shower snow','heavy shower snow']

const mist=['mist','smoke','haze','sand/dust whirls','fog','sand','dust','volcanic ash','squalls','tornado']
const rainy=['light rain','moderate rain','heavy intensity rain','very heavy rain','extreme rain','freezing rain','light intensity shower rain','shower rain','heavy intensity shower rain','ragged shower rain	']
const handelCity=()=>{

  if(search){
    setcity(search)
    setSearch('')
  }

}

const handleToggletemp=(type)=>{
 
  if(type==='imperial'){
    setUnits('imperial')
  }else{
    setUnits('metric')
  }

 
}

// for the cuurrent location of the user 
useEffect(() => {
if(!city){
    const getData = async () => {
      setloading(true)
      try {
        const data =await fetchCurrentLocation(units);
        if (data) {
        console.log(data)
        setWeather(data);
        setloading(false)
      
        } else {
          console.error('Weather data is undefined.');
          setloading(false)

        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setloading(false)

      }
    };
    getData();
 
}


}, [units]);

useEffect(()=>{

  if(city){
  const fetchData=async()=>{
    setloading(true)
    try {
      const res=await fetchWeatherApiData(city,units)
      console.log(res)
setWeather(res)
setloading(false)


    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
      setloading(false)
    }

  }
  fetchData()
}

},[city,units])






  return (
  
    <>
    {
      loading  ?
     <Loading/>
      :
    

   <div className="App">

{
units==='metric' ?
<Button variant='contained' sx={{position:'absolute' ,right:'1rem',top:'1rem',background:'white',color:'black',fontSize:'',fontWeight:'bold'}} onClick={()=>handleToggletemp('imperial')}>°f</Button>
:
<Button variant='contained' sx={{position:'absolute' ,right:'1rem',top:'1rem',background:'white',color:'black',fontSize:'',fontWeight:'bold'}} onClick={()=>handleToggletemp('metric')}>°c</Button>


}

       <CardMedia
                  component="img"
                  sx={{ width: '100%', height: '100%', objectFit: 'cover',zIndex:'-1',position:'absolute' }}
                  image={`${clouds.includes(weather?.description) && cloudbg || thunderstorm.includes(weather?.description) && cloudbg || mist.includes(weather?.description) && hotBg || rainy.includes(weather?.description) && rainyBg || snow.includes(weather?.description) && snowbg || weather?.description==='clear sky' && clearbg}`}
                  alt="clouds"

                />
     <div className='weatherComponent'>
     <Paper
        component="form"
        className='searchInput'
      >

        <InputBase
          sx={{ ml: 1, flex: 1,color:'white',fontWeight:'bold' }}
          placeholder="Enter City..."
          // inputProps={{ 'aria-label': 'search google maps' }}
          value={search}
         
          onChange={(e)=>setSearch(e.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px',color:'white' }} aria-label="search" onClick={handelCity}>
          <SearchIcon />
        </IconButton>

      </Paper>

      {
        error ?
        <Paper
        component="form"
        className='errorContainer'
      >
       <ErrorPage/>
       </Paper>
        :
        <>
        
      
      <Paper
        component="form"
        className='tempContainer'
      >

<div className="loction">
<p>{weather?.name}, {weather?.country}</p>
<img src={`https://openweathermap.org/img/wn/${weather?.iconURL}@2x.png`} alt="weathericon" />
 <p>{weather?.description}</p>
</div>
<div className="temp">
<h1>{`${weather?.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
</div>

      </Paper>

      <Paper
        component="form"
        className='discription'
      >
<Descriptions weather={weather} units={units}/>
      </Paper>
      </>
      }
      </div> 
   
   </div>
}
   </>

  )
}

export default App
