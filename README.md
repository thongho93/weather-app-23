🌤️ #Stormry

En moderne og intuitiv værapp bygget med React, Express, og WeatherAPI.
Stormry gir deg værinformasjon i et stilrent og lettlest UI inspirert av Yr og Apple Weather.

⸻

📸 ##Skjermbilde
<img src="./docs/screenshot-main.png" width="900" />

⸻

🚀 ##Funksjoner

Vær akkurat nå
• Temperatur
• Føles-som temperatur
• Ikon for værforhold (dag/natt)
• Nedbør i mm
• Vindhastighet
• Vindretning

Resten av dagen
• Viser tidsbolker
• Temperatur
• Nedbør i mm
• Vindhastighet og retning

Lokasjon og søk
• Automatisk henting av brukerens posisjon
• Søk etter byer og velg fra treffliste
• Viser region og land

⸻

🧱 ##Teknologistack
Teknologi:
• Frontend: React, Styled Components
• Backend: Node.js, Express
• Værdata: WeatherAPI

⸻

🔧 ##Installere og kjøre prosjektet

1. Klon repoet:
   ````git clone <https://github.com/thongho93/weather-app-23.git>
   cd my-weather-app```
   ````
2. Installer avhengigheter for frontend:
   `npm install`
3. Installer avhengigheter for backend:
   ````cd server
   npm install```
   ````
4. Sett opp miljøvariabler:
   Opprett en `.env` fil i `server` mappen med følgende innhold:
   ` WEATHER_API_KEY=din_weatherapi_nøkkel`
5. Kjør backend serveren:

````cd server
 npm start```
 http://localhost:4000/api/weather
6. Kjør frontend appen:
``` cd ..
 npm start
 http://localhost:3000```

⸻

📌 ##Videreutvikling
• Lagre favorittsteder (LocalStorage)
• 7-dagers langtidsvarsel
• Time-for-time graf
• Lys/mørk tema-bryter
• Bedre animasjoner for værikoner
• Caching i backend for raskere responser

⸻

📜 ##Lisens

[MIT] License
````
