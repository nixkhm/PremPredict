import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Standings.css";

function Standings() {
  const [teams, setTeams] = useState([]);
  const [gamesPlayed, setGamesPlayed] = useState([]);
  const [wins, setWins] = useState([]);
  const [draws, setDraws] = useState([]);
  const [losses, setLosses] = useState([]);
  const [goalDif, setGoalDif] = useState([]);
  const [points, setPoints] = useState([]);

  /*
Communicating with the API to retrieve the next 10 fixtures in the Premier League
*/
  useEffect(() => {
    axios
      .get("http://localhost:8000/standings")
      .then((response) => {
        const teamNames = response.data[0].map((club: any) => club.team.name);
        setTeams(teamNames);
        const played = response.data[0].map((club: any) => club.all.played);
        setGamesPlayed(played);
        const win = response.data[0].map((club: any) => club.all.win);
        setWins(win);
        const draw = response.data[0].map((club: any) => club.all.draw);
        setDraws(draw);
        const loss = response.data[0].map((club: any) => club.all.lose);
        setLosses(loss);
        const gdiff = response.data[0].map((club: any) => club.goalsDiff);
        setGoalDif(gdiff);
        const point = response.data[0].map((club: any) => club.points);
        setPoints(point);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="Standings">
      <h1>Premier League Standings</h1>
      <table style={{ margin: "0 auto", textAlign: "center" }}>
        <tr>
          <th>Team</th>
          <th>Games Played</th>
          <th>Wins</th>
          <th>Draws</th>
          <th>Losses</th>
          <th>Goal DIfference</th>
          <th>Points</th>
        </tr>
        <tr className="pos">
          <td>
            {teams.map((team, index) => {
              return (
                <div key={index}>
                  <td>{index + 1 + ". " + team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {gamesPlayed.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {wins.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {draws.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {losses.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {goalDif.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
          <td>
            {points.map((team, index) => {
              return (
                <div key={index}>
                  <td>{team}</td>
                </div>
              );
            })}
          </td>
        </tr>
      </table>
    </div>
  );
}

export default Standings;
