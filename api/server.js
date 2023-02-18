import express from "express";
import cors from "cors";
import axios from "axios";
import { config } from "dotenv";

config();

const app = express();
app.use(cors());

/*
Teams API endpoint, returns JSON of Fixture information about each team, the home and away team
*/
app.get("/teams", (req, res) => {
  const options = {
    method: "GET",
    url: process.env.APIURL,
    params: { league: "39", next: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.APIKEY,
      "X-RapidAPI-Host": process.env.APIHOST,
    },
  };
  axios
    .request(options)
    .then((response) => {
      const games = response.data.response.map((fixture) => fixture.teams);
      res.send(games);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occured");
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
