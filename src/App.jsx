import { useState, useEffect } from 'react'
import Component from './assets/component'
import { nanoid } from 'nanoid'

function App() {
  const [Data, setData] = useState([])
  const [City, setCity] = useState()
  const [Country, setCountry] = useState()

  useEffect(() => {
    const getLocation = new Promise((resovle, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resovle({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        })
      } else {
        reject('Your Browser Does Not Support Geo Location API.')
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
            console.log(json)
            setCountry(json.country_code)
            setCity(json.city_name)
            setData(json.data)
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
        Country: {Country} / {City}
      </h3>
      <section id='main-section'>{newElement}</section>
    </main>
  )
}

export default App
