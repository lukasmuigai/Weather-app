import { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;


function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) throw new Error("City not found");

      const result = await res.json();
      setData(result);
    } catch (err) {
      setData(null);
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>🌤️ Weather App</h2>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="weather-info">
          <h3>{data.name}</h3>
          <p>🌡️ {data.main.temp} °C</p>
          <p>☁️ {data.weather[0].description}</p>
          <p>💧 Humidity: {data.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;

