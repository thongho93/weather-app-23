# 🌤️ Stormry

En moderne og intuitiv værapp bygget med React, Express, og WeatherAPI.
Stormry gir deg værinformasjon i et stilrent og lettlest UI inspirert av Yr og Storm.

## 📸 Skjermbilde

<img src="/my-weather-app/src/assets/logo.png" width="700" />

## 🚀 Funksjoner

Vær akkurat nå:

- Temperatur
- Føles-som temperatur
- Ikon for værforhold (dag/natt)
- Nedbør i mm
- Vindhastighet
- Vindretning

Resten av dagen:

- Viser tidsbolker
- Temperatur
- Nedbør i mm
- Vindhastighet og retning

Lokasjon og søk:

- Automatisk henting av brukerens posisjon
- Søk etter byer og velg fra treffliste
- Viser region og land

## 🧱 Teknologistack

Teknologi:

- [![Next][Next.js]][https://nextjs.org/]
- [![React][React.js]][https://reactjs.org/]
- [![Express][Express.js]][https://expressjs.com/]

## 🔧 Installere og kjøre prosjektet

Installer avhengigheter for frontend:

- npm
  ```sh
  npm install npm@latest -g
  ```

1. Klon repoet:

   ```sh
   git clone https://github.com/thongho93/weather-app-23.git
   cd my-weather-app
   ```

2. Installer avhengigheter for backend:
   ```sh
   cd server
   npm install
   ```
3. Sett opp miljøvariabler:
   Opprett en `.env` fil i `server` mappen med følgende innhold:

   ```sh
   WEATHER_API_KEY=din_weatherapi_nøkkel
   ```

4. Kjør backend serveren:

   ```sh
   cd server
   npm start
   http://localhost:4000/api/weather
   ```

5. Kjør frontend appen:

   ```sh
   cd ..
   npm start
   http://localhost:3000
   ```

## 📌 Videreutvikling

- Lagre favorittsteder (LocalStorage)
- 7-dagers langtidsvarsel
- Time-for-time graf
- Lys/mørk tema-bryter
- Bedre animasjoner for værikoner
- Caching i backend for raskere responser

## 📜 Lisens

[MIT] License
