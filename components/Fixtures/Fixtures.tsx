import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Fixtures.css";

function Fixtures() {
  /*
State to hold the upcoming fixtures, user input for each home and away team, 
and whether the submit/modify button was toggled
*/
  const [fixtures, setFixtures] = useState([]);
  const [homeScore, setHomeScore] = useState(
    new Array(fixtures.length).fill("")
  );
  const [awayScore, setAwayScore] = useState(
    new Array(fixtures.length).fill("")
  );
  const [isClicked, setIsClicked] = useState(
    new Array(fixtures.length).fill(true)
  );

  /*
Communicating with the API to retrieve the next 10 fixtures in the Premier League
*/
  useEffect(() => {
    axios
      .get("http://localhost:8000/teams")
      .then((response) => {
        const games = response.data.map(
          (teams: any) => teams.home.name + " vs. " + teams.away.name
        );
        setFixtures(games);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  /*
Updates the state of each home score when entered in the input tag
*/
  const handleHomeScoreChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newHomeScore = [...homeScore];
    newHomeScore[index] = String(event.target.value);
    setHomeScore(newHomeScore);
  };

  /*
Updates the state of each away score when entered in the input tag
*/
  const handleAwayScoreChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newAwayScore = [...awayScore];
    newAwayScore[index] = String(event.target.value);
    setAwayScore(newAwayScore);
  };

  /*
When the button is clicked to submit the score, its state will be reversed back
to allow the user to modify their score
*/
  const handleClick = (index: number) => {
    if (isClicked[index]) {
      setIsClicked((prevState) => {
        const newState = [...prevState];
        newState[index] = false;
        return newState;
      });
    } else {
      setIsClicked((prevState) => {
        const newState = [...prevState];
        newState[index] = true;
        return newState;
      });
    }
  };

  const preventNegative = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div className="Fixtures">
      <h1>Premier League Predictor</h1>
      <ul>
        {fixtures.map((fixture, index) => (
          <li key={index}>
            <div>{fixture}</div>
            {isClicked[index] ? (
              <div>
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      className="team"
                      type="number"
                      value={Math.max(0, homeScore[index])}
                      onChange={(e) => handleHomeScoreChange(e, index)}
                      disabled={isClicked[index]}
                    />
                    <input
                      className="team"
                      type="number"
                      value={Math.max(0, awayScore[index])}
                      onChange={(e) => handleAwayScoreChange(e, index)}
                      disabled={isClicked[index]}
                    />
                  </form>
                </div>
                <button onClick={() => handleClick(index)}>Modify</button>
              </div>
            ) : (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    className="team"
                    type="number"
                    value={Math.max(0, homeScore[index])}
                    onChange={(e) => handleHomeScoreChange(e, index)}
                    disabled={isClicked[index]}
                  />
                  <input
                    className="team"
                    type="number"
                    value={Math.max(0, awayScore[index])}
                    onChange={(e) => handleAwayScoreChange(e, index)}
                    disabled={isClicked[index]}
                  />

                  <button onClick={() => handleClick(index)}>Submit</button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fixtures;
