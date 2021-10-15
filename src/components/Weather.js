import React, { useState } from 'react'

import sun from '../sun.png'
import windIcon from '../wind.png'
import gotasIcon from '../gotas-de-agua.png'
import temperatureIcon from '../calor.png'

export const Weather = () => {

    const [weather, setWeather] = useState({
        country: '',
        temperature: 0,
        humidity: 0,
        wind: 0,
        max_temperature: 0,
        feels_like: 0,
        loading: false
    })

    const { country, temperature, humidity, wind, max_temperature, loading, feels_like } = weather

    const handleCountry = ({ target }) => {
        setWeather({
            ...weather,
            [target.name]: target.value
        })
    }

    const HandleSubmitForm = (e) => {
        e.preventDefault()

        setWeather({
            ...weather,
            loading: true
        })

        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${country}&units=imperial`, {
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': 'e12a36f752mshb1cb2982e0fa62fp11e4bejsn921c2eb89873'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            const { humidity:info_humidity, feels_like:info_feels_like, temp_max, temp} = data.main
            const { speed } = data.wind
            setWeather({
                ...weather,
                country: country,
                humidity: info_humidity,
                feels_like: convertToCelsius(info_feels_like),
                max_temperature: convertToCelsius(temp_max),
                temperature: convertToCelsius(temp),
                wind: speed,
                loading: false
            })
        })

    }

    const convertToCelsius = (num) => {
        return Math.round( (num - 32 ) / 1.8 )            
    }

    return (
        <div className="parent-weather mt-2">
            <form className="row" onSubmit={HandleSubmitForm}>
                <div className="col-auto w-100">
                    <input className="form-control" type="text" placeholder="Weather" name="country" value={country} onChange={handleCountry} autoComplete="off"/>
                </div>
            </form>
            {
                loading && (
                    <div className="alert alert-primary mt-2" role="alert">
                        Cargando
                    </div>
                )
            }

            <div className="bg-light p-3 mt-3 rounded">
                <p className="fs-4 fw-bold">Current Weather</p>
                <div className="d-flex flex-row justify-content-evenly p-4 pt-0 first-info-weather text-center">
                    <div className="d-flex flex-row">
                        <div>
                            <p className="fw-bold">{ country }</p>
                            <img src={sun} alt="sun" />
                            <p className="fw-bold mt-4"> Clouds </p>
                        </div>
                        <div className="align-self-center ms-4">
                            <h1 className="display-1"> { temperature }° </h1>
                        </div>
                    </div>
                    <div className="text-start">
                        <p className="fw-bold"> Feels Like { feels_like }° </p>
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={gotasIcon} alt="Humidity" />
                                    </td>
                                    <td>Humidity</td>
                                    <td>{humidity}%</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={windIcon} alt="Wind" />
                                    </td>
                                    <td>Wind</td>
                                    <td>{ wind }kph</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={temperatureIcon} alt="Max Temperature" />
                                    </td>
                                    <td>Temp. Max</td>
                                    <td>{ max_temperature }°</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
