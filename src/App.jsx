import { useState, useEffect } from 'react'
import Component from './assets/component'
import { nanoid } from 'nanoid'

function App() {
  const [Data, setData] = useState([])
  const [Location, setLocation] = useState([])
  const [Error, setError] = useState(false)

  useEffect(() => {
    const getLocation = new Promise((resovle, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resovle({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            })
          },
          function () {
            return setError(true)
          }
        )
      } else {
        reject(console.error('Your Browser Does Not Support Geo Location API.'))
      }
    })
    getLocation
      .then(res => {
        const API_KEY = 'b861fe929ce2454e9e7a72d84e8cada7'
        fetch(
          `https://api.weatherbit.io/v2.0/forecast/daily?lat=${res.lat}&lon=${res.lon}&key=${API_KEY}`
        )
          .then(response => response.json())
          .then(json => {
            setData(json.data)
            setLocation(json)
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }, [])

  const newElement = Data.map(items => {
    return (
      <Component
        iconCode={items.weather.icon}
        title={items.weather.description}
        date={items.datetime}
        max_temp={Math.floor(items.max_temp)}
        min_temp={Math.floor(items.min_temp)}
        max_feel_temp={Math.floor(items.app_max_temp)}
        min_feel_temp={Math.floor(items.app_min_temp)}
        key={nanoid()}
      />
    )
  })

  return (
    <main>
      <h1>Weather App</h1>
      <h3>
        Location: {Location.country_code} / {Location.city_name}
      </h3>
      {Error && (
        <div className='error-contianer'>
          <img src='/giphy.gif' alt='Gif' loading='lazy' />
          <h3>Please Turn On Your Location.</h3>
        </div>
      )}
      <section id='main-section'>{newElement}</section>
    </main>
  )
}

export default App
