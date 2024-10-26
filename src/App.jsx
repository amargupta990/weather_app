import { useEffect, useState } from 'react';

function App() {
  const API_KEY = '26bda57a90725222e0e83635ea9f00fa';
  const [city, setCity] = useState("London");
  const [Weatherdata, setWeatherdata] = useState(null);

  // Getting input
  const onchangehandler = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };


  // API request
  const requestMaker = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      console.log(data); // Log the full response
      setWeatherdata(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherdata(null); // Clear data if there's an error
    }
 };

  // useEffect to fetch data on city change
  useEffect(() => {
    requestMaker();
  }, []);

  // onSubmitHandler
  const onSubmitHandler = (e) => {
    e.preventDefault();
    requestMaker();
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='bg-white w-[400px] rounded-md p-16 h-[400px] mt-[10rem] backdrop-blur-sm bg-white/30'>
          <h1 className='text-center font-serif font-bold text-[2rem] text-[#21434e] mb-3'>WEATHER APP</h1>
          <h1 className='text-center font-bold text-[1.1rem] text-[#21434e]'>27 OCT 2024</h1>
          <h1 className='text-center font-serif font-normal text-[1.3rem] mb-5'>{city}</h1>

          {Weatherdata ? (
            <>
              <h1 className='text-center font-serif font-bold text-[1.5rem] mb-2 text-[#21434e]'>
                {Weatherdata.main.temp} °C
              </h1>
              <h2 className='text-center font-serif font-normal text-[1.1rem] mb-5'>
                {Weatherdata.weather[0].description}
              </h2>
            </>
          ) : (
            <h2 className='text-center font-serif font-normal text-[1.1rem] mb-5'>No data available</h2>
          )}

          <form className='flex justify-center mt-2' onSubmit={onSubmitHandler}>
            <input 
              onChange={onchangehandler} 
              className='p-1 rounded w-[80%]' 
              placeholder='Enter city' 
              type="text"
            />
            <button className='bg-[#21434e] w-10 rounded text-white' type='submit'>Get</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
