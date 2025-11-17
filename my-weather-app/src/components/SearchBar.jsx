import { useState } from "react";
import { SEARCH_URL } from "../api/constant.mjs";
import styles from "../styles/searchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({ city, setCity, onSearch, onLocation, onSelectLocation }) {
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function handleChange(e) {
    const value = e.target.value;
    setCity(value);

    // If very short input → no suggestions
    if (value.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    try {
      const res = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(value)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch suggestions");
      }
      const data = await res.json(); // array of locations
      setSuggestions(data);
      setOpen(true);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
      setOpen(false);
    }
  }

  function handleSelect(location) {
    // Tell parent which location user picked
    if (onSelectLocation) {
      onSelectLocation(location);
    }

    // Show chosen name in input (or clear it if you prefer)
    setCity("");
    setSuggestions([]);
    setOpen(false);
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

export default SearchBar;
