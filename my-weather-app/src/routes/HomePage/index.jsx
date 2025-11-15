import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../api/constant.mjs";

function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchByLocation() {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(`${BACKEND_URL}?lat=${lat}&lon=${lon}`);
          if (!response.ok) {
            throw new Error("Could not fetch weather by location");
          }

          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Permission denied or unable to get location.");
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    fetchByLocation();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(`${BACKEND_URL}?city=${encodeURIComponent(city)}`);
      if (!response.ok) {
        throw new Error("Could not fetch weather for the specified city");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch}>
        <button type="button" onClick={fetchByLocation}>
          My position
        </button>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && (
        <div>
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
        </div>
      )}
    </div>
  );
}

export default HomePage;
