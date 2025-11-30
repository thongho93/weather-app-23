import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/homePage.module.css";

export default function HomePage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeatherByCoords(lat, lon) {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:4000/api/weather?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error("Counld not fetch weather data");

      const data = await res.json();
      setWeather(data);
      if (data?.location?.name) {
        setCity(data.location.name);
      }
    } catch (err) {
      console.error("Weather error:", err);
      setError(err.message || "Something went wrong while fetching weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleLocation() {
    if (!navigator.geolocation) {
      setError("Browser does not support geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        setError("Could not fetch location.");
        console.error("Geolocation error", err);
      }
    );
  }

  // Kalles når bruker velger et forslag fra søk
  function handleSelectLocation(location) {
    // location kommer fra WeatherAPI sitt search-endepunkt
    // der pleier du å ha .lat og .lon
    fetchWeatherByCoords(location.lat, location.lon);
  }

  // Hent "my position" automatisk når siden lastes
  useEffect(() => {
    handleLocation();
  }, []);

  function formatWeatherDate(localtime) {
    if (!localtime) return "";

    // localtime is in format "YYYY-MM-DD HH:MM"
    const datePart = localtime.split(" ")[0];
    const date = new Date(datePart);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("no-NO", options);
  }

  return (
    <div>
      <SearchBar
        city={city}
        setCity={setCity}
        onLocation={handleLocation}
        onSelectLocation={handleSelectLocation}
      />

      {loading && <p>Laster vær...</p>}
      {error && <p>{error}</p>}

      {weather && (
        <div>
          <div>
            <h1>{weather.location.name}</h1>
            <h3>
              {weather.location.region}, {weather.location.country}
            </h3>
          </div>
          <div className={styles.todayWeatherWrapper}>
            <div>
              <h4>Været nå</h4>
              <p>{formatWeatherDate(weather.location.localtime)}</p>
              <img src={weather.current.condition.icon} alt={weather.current.condition.text} />{" "}
              <div>
                <p>{weather.current.condition.text}</p>
              </div>
            </div>
            <p>Temperatur: {weather.current.temp_c}°C</p>
          </div>
        </div>
      )}
    </div>
  );
}
