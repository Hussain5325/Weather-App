import { useState, useEffect } from 'react'

function Component(props) {
  return (
    <section className='container'>
      <img
        src={`https://www.weatherbit.io/static/img/icons/${props.iconCode}.png`}
        alt='icon'
        className='icons'
        loading='lazy'
      />
      <div className='insided_container'>
        <p className='heading title'>
          Status: <b>{props.title}</b>
        </p>
        <p className='heading date'>
          Date: <b>{props.date}</b>
        </p>
        <p className='heading max_temp'>
          Max Temp: <b>{props.max_temp}°C</b>
        </p>
        <p className='heading min_temp'>
          Min Temp: <b>{props.min_temp}°C</b>
        </p>
        <p className='heading app_max_temp'>
          Max Temp Feels: <b>{props.max_feel_temp}°C</b>
        </p>
        <p className='heading app_min_temp'>
          Min Temp Feels: <b>{props.min_feel_temp}°C</b>
        </p>
      </div>
    </section>
  )
}

export default Component
