import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 4000; // du kan velge et annet tall om du vil

app.use(cors()); // lar React-appen din (på f.eks. 5173) snakke med denne serveren

const BASE_URL = "https://api.weatherapi.com/v1";

// GET /api/weather?city=Oslo
// GET /api/weather?lat=59.9&lon=10.8
app.get("/api/weather", async (req, res) => {
  const { city, lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  try {
    let q;

    if (lat && lon) {
      // bruker koordinater (fra geolocation)
      q = `${lat},${lon}`;
    } else if (city) {
      // bruker by-navn
      q = city;
    } else {
      return res.status(400).json({ error: "Missing city or coordinates" });
    }

    const url = `${BASE_URL}/current.json?key=${apiKey}&q=${encodeURIComponent(q)}&lang=no`;

    const response = await axios.get(url);

    // sender kun værdata tilbake til frontend, ikke nøkkelen
    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});

app.listen(PORT, () => {
  console.log(`Weather backend running on http://localhost:${PORT}`);
});
