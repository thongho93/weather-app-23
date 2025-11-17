import { useState } from "react";
import styles from "../../styles/searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ city, setCity, onSearch, onLocation, onSelectLocation }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function handleChange(e) {
    setCity(e.target.value);
    if (e.target.value.length > 2) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  }

  async function fetchSuggestions(query) {
    try {
      const response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=YOUR_API_KEY`);
      const data = await response.json();
      setSuggestions(data.features.map((feature) => ({
        id: feature.properties.place_id,
        name: feature.properties.name,
        region: feature.properties.state,
        country: feature.properties.country,
        lat: feature.properties.lat,
        lon: feature.properties.lon,
      })));
      setOpen(true);
    } catch (error) {
      setSuggestions([]);
      setOpen(false);
    }
  }

  function handleSelect(loc) {
    setCity(loc.name);
    setSuggestions([]);
    setOpen(false);
    onSelectLocation(loc);
    setExpanded(false);
  }

  if (expanded) {
    return (
      <div className={styles.searchbarWrapper}>
        <form onSubmit={(e) => e.preventDefault()} className={styles.searchbarExpanded}>
          <div className={styles.searchInputWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              value={city}
              onChange={handleChange}
              placeholder="Søk etter et sted"
              className={styles.searchInput}
              autoFocus
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setExpanded(false);
              setSuggestions([]);
            }}
            className={styles.closeButton}
          >
            Lukk ✕
          </button>
        </form>

        <div className={styles.positionBelow}>
          <button type="button" onClick={onLocation}>
            My position
          </button>
        </div>

        {open && suggestions.length > 0 && (
          <ul className={styles.suggestionsList}>
            {suggestions.map((loc) => (
              <li
                key={`${loc.id}-${loc.lat}-${loc.lon}`}
                onClick={() => handleSelect(loc)}
                className={styles.suggestionItem}
              >
                <div>{loc.name}</div>
                <div className={styles.suggestionSub}>
                  {loc.region}, {loc.country}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={styles.searchbarWrapper}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.searchbarInner}>
        <button type="button" onClick={onLocation}>
          My position
        </button>
        <div className={styles.searchInputWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            value={city}
            onChange={handleChange}
            onFocus={() => setExpanded(true)}
            placeholder="Søk etter et sted"
            className={styles.searchInput}
          />
        </div>
      </form>
      {open && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((loc) => (
            <li
              key={`${loc.id}-${loc.lat}-${loc.lon}`}
              onClick={() => handleSelect(loc)}
              className={styles.suggestionItem}
            >
              <div>{loc.name}</div>
              <div className={styles.suggestionSub}>
                {loc.region}, {loc.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
