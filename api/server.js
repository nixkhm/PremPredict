import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());

//fixtures API endpoint
app.get("/teams", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: { league: "39", next: "10" },
    headers: {
      "X-RapidAPI-Key": "921f9a1116mshe0f08db031ed79ep168afcjsna33577b8a792",
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
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

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
