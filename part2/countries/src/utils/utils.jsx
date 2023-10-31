const clearWeatherData = (weatherData) => {
  if (!weatherData || !Object.keys(weatherData).length) {
    return undefined
  }

  const { main, wind, weather } = weatherData

  const temperatureKelvin = main.temp
  const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1)

  const windSpeed = wind.speed.toFixed(2)
  const weatherImgId = weather[0].icon

  return {
    temperature: temperatureCelsius,
    wind: windSpeed,
    weatherImgId: weatherImgId,
  }
}

export { clearWeatherData }
