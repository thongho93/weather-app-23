import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles/homePage.module.css";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

export default function HomePage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoverStar, setHoverStar] = useState(false);

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

  // Formaterer dato fra værdata til lesbar norsk dato
  function formatWeatherDate(localtime) {
    if (!localtime) return "";

    // localtime is in format "YYYY-MM-DD HH:MM"
    const datePart = localtime.split(" ")[0];
    const date = new Date(datePart);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("no-NO", options);
  }

  // Hent værprognose for resten av dagen i definerte tidsblokker
  function getRestOfDayForecast(weather) {
    const hours = weather?.forecast?.forecastday[0]?.hour || [];
    if (!hours.length) return [];

    const ranges = [
      { label: "10-16", start: 10, end: 16 },
      { label: "16-22", start: 16, end: 22 },
      { label: "22-04", start: 22, end: 4 },
      { label: "04-10", start: 4, end: 10 },
    ];

    function inRange(hour, start, end) {
      if (start < end) {
        // vanlig intervall (f.eks. 14–16)
        return hour >= start && hour < end;
      }
      // intervall over midnatt (f.eks. 22–04)
      return hour >= start || hour < end;
    }

    return ranges
      .map((range) => {
        const subset = hours.filter((h) => {
          const hour = new Date(h.time).getHours();
          return inRange(hour, range.start, range.end);
        });

        if (subset.length === 0) return null;
        // enkel “sammendrag” for tidsintervallet
        const avgTemp = subset.reduce((sum, h) => sum + h.temp_c, 0) / subset.length;

        const totalPrecip = subset.reduce((sum, h) => sum + h.precip_mm, 0);

        const avgWindKph = subset.reduce((sum, h) => sum + h.wind_kph, 0) / subset.length;
        const avgWindMs = avgWindKph / 3.6;

        const midHour = subset[Math.floor(subset.length / 2)];

        return {
          label: range.label,
          icon: midHour.condition.icon,
          conditionText: midHour.condition.text,
          temp: Math.round(avgTemp),
          precip: totalPrecip.toFixed(1),
          wind: Math.round(avgWindMs), // m/s avrundet
        };
      })
      .filter(Boolean);
  }

  const restOfDayForecast = weather ? getRestOfDayForecast(weather) : [];

  // Kartlegging av vindretninger til norske beskrivelser
  const windDirMap = {
    N: "nord",
    NNE: "nord-nordøst",
    NE: "nordøst",
    ENE: "øst-nordøst",
    E: "øst",
    ESE: "øst-sørøst",
    SE: "sørøst",
    SSE: "sør-sørøst",
    S: "sør",
    SSW: "sør-sørvest",
    SW: "sørvest",
    WSW: "vest-sørvest",
    W: "vest",
    WNW: "vest-nordvest",
    NW: "nordvest",
    NNW: "nord-nordvest",
  };

  // Vind i m/s og beskrivelse
  const windMs = Math.round(weather.current.wind_kph / 3.6);
  const dir = windDirMap[weather.current.wind_dir] || weather.current.wind_dir;
  const windDescription = getWindDescription(windMs, dir);
  function getWindDescription(ms, dir) {
    let desc = "";

    if (ms < 0.3) desc = "stille";
    else if (ms < 1.6) desc = "flau vind";
    else if (ms < 3.4) desc = "svak vind";
    else if (ms < 5.5) desc = "lett bris";
    else if (ms < 8.0) desc = "laber bris";
    else if (ms < 10.8) desc = "frisk bris";
    else if (ms < 13.9) desc = "liten kuling";
    else if (ms < 17.2) desc = "stiv kuling";
    else if (ms < 20.8) desc = "sterk kuling";
    else if (ms < 24.5) desc = "liten storm";
    else if (ms < 28.5) desc = "full storm";
    else if (ms < 32.7) desc = "sterk storm";
    else desc = "orkan";

    return `${desc} fra ${dir}`;
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
          <div className={styles.locationWrapper}>
            <div className={styles.locationNameWrapper}>
              <h1>{weather.location.name}</h1>
              <div onMouseEnter={() => setHoverStar(true)} onMouseLeave={() => setHoverStar(false)}>
                {hoverStar ? (
                  <StarIcon className={styles.starIcon} />
                ) : (
                  <StarBorderIcon className={styles.starIcon} />
                )}
              </div>
            </div>
            <div>
              <h5 className={styles.locationRegionScript}>
                {weather.location.region}, {weather.location.country}
              </h5>
            </div>
          </div>
          <div className={styles.todayWeatherWrapper}>
            <div className={styles.todayNowWrapper}>
              <div className={styles.todayHeader}>
                <h2>Været nå</h2>
                <p className={styles.todayDate}>{formatWeatherDate(weather.location.localtime)}</p>
              </div>

              <div className={styles.todayNowContent}>
                <div className={styles.todayLeft}>
                  <div className={styles.todayIconTempRow}>
                    <div className={styles.todayIconWrapper}>
                      <img
                        src={weather.current.condition.icon}
                        alt={weather.current.condition.text}
                      />
                    </div>
                    <div className={styles.todayTempWrapper}>
                      <p className={styles.todayTemp}>{weather.current.temp_c}°</p>
                      <p className={styles.todayFeels}>Føles som {weather.current.feelslike_c}°C</p>
                    </div>
                  </div>
                </div>

                <div className={styles.todayRight}>
                  <div>
                    <p className={styles.todayWind}>{windMs} m/s</p>
                    <p>{windDescription}</p>
                  </div>
                  <p className={styles.todayPrecip}>{weather.current.precip_mm} mm</p>
                </div>
              </div>
            </div>

            {restOfDayForecast.length > 0 && (
              <div className={styles.restOfDayWrapper}>
                <h5>Resten av dagen</h5>
                <div className={styles.restOfDayList}>
                  {restOfDayForecast.map((block) => (
                    <div key={block.label} className={styles.restOfDayItem}>
                      <p>{block.label}</p>
                      <img src={block.icon} alt={block.conditionText} />
                      <p>{block.temp}°</p>
                      <p>{block.precip} mm</p>
                      <p>{block.wind} m/s</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
