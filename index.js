import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import {
  getStations,
  getAStation,
  getTripMonth_05,
  getTripMonth_05byId,
} from "./connection.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {

  response.send("<h1>Solita</h1><p>Station and Month 05 - 2021</p>");
});

app.get("/api/stations", getStations);
app.get("/api/stations/:id", getAStation);

app.get("/api/month_05/:number", getTripMonth_05);
app.get("/api/month_05/:id", getTripMonth_05byId);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
