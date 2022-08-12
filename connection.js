import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const dataURL = process.env.MONGODB_URI;

console.log("connecting to", dataURL);

mongoose
  .connect(dataURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const stations = new mongoose.Schema({
  FID: String,
  ID: String,
  Nimi: String,
  Namn: String,
  Name: String,
  Osoite: String,
  Adress: String,
  Kaupunki: String,
  Stad: String,
  Operaattor: String,
  Kapasiteet: String,
  x: String,
  y: String,
});

const stationModel = mongoose.model("stations", stations);

const month_05 = new mongoose.Schema({
  Departure: String,
  Return: String,
  "Departure station id": String,
  "Departure station name": String,
  "Return station id": String,
  "Return station name": String,
  "Covered distance (m)": String,
  "Duration (s)": String,
});

const month_05Model = mongoose.model("month_05", month_05);

export const getStations = async (request, response) => {
  try {
    const allStations = await stationModel.find();

    response.status(200).json(allStations);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getAStation = async (request, response) => {
  const { id } = request.params;
  try {
    const item = await stationModel.findById(id);
    response.status(200).json(item);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getAStationbyName = async (request, response) => {
  const { query } = request.params;
  try {
    const items = await stationModel.find({ Name: query });

    response.status(200).json(items);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getTripMonth_05 = async (request, response) => {
  const { number } = request.params;
  try {
    const trips = await month_05Model.find().limit(number);

    response.status(200).json(trips);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getTripMonth_05byId = async (request, response) => {
  const { id } = request.params;
  try {
    const tripbyId = await month_05Model.findById(id);
    response.status(200).json(tripbyId);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
