import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Standings.css";

function Standings() {
  const [teams, setTeams] = useState([]);

  /*
Communicating with the API to retrieve the next 10 fixtures in the Premier League
*/
  useEffect(() => {
    axios
      .get("http://localhost:8000/standings")
      .then((response) => {
        const teamNames = response.data[0].map((club: any) => club.team.name);
        setTeams(teamNames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="Standings">
      <h1>Premier League Standings</h1>
      <ul>
        {teams.map((team, index) => {
          return (
            <li className="Team" key={index}>
              <div>{team}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Standings;
