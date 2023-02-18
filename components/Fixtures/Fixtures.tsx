import axios from 'axios'
import React, {useEffect, useState} from 'react'
import './Fixtures.css'
import SubmitButton from '../SubmitButton/SubmitButton'

function Fixtures() {
    const [fixtures, setFixtures] = useState([]);
    const [homeScore, setHomeScore] = useState(new Array(fixtures.length).fill(''));
    const [awayScore, setAwayScore] = useState(new Array(fixtures.length).fill(''));

    //populating the Home and Away team of the fixture
    useEffect(() => {
    axios.get('http://localhost:8000/teams').then((response) => {
      const games = response.data.map((teams: any) => teams.home.name + ' vs. ' + teams.away.name)
      setFixtures(games);
    }).catch((error) =>{
      console.error(error)
    });
  }, []);

    const handleHomeScoreChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newHomeScore = [...homeScore];
        newHomeScore[index] = String(event.target.value);
        setHomeScore(newHomeScore)
  }

    const handleAwayScoreChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newAwayScore = [...awayScore];
        newAwayScore[index] = String(event.target.value);
        setAwayScore(newAwayScore);
    }
/*
    const handleModifyScore = (index: number) => {
      const newHomeScore = [...homeScore];
      newHomeScore[index] = '';
      setHomeScore(newHomeScore);

      const newAwayScore = [...awayScore];
      newAwayScore[index] = '';
      setAwayScore(newAwayScore);
    }

  const handleSubmitScore = (index: number) => {
    // Save the scores here
    const newSubmittedScores = [...submittedScores];
    newSubmittedScores[index] = [homeScore[index], awayScore[index]];
    setSubmittedScores(newSubmittedScores);
};

<SubmitButton currentHomeScore = { homeScore }  currentAwayScore = { awayScore } />
*/
  return (
    <div className = 'Fixtures'>
        <h1>Premier League Predictor</h1>
        <ul>
        {fixtures.map((fixture, index) => (
          <li key = {index}>{fixture}<div>
          <form onSubmit={(e) => {
            e.preventDefault();
          }}><input className = "team" type='number' value = {homeScore[index]} onChange = {(e) => handleHomeScoreChange(e, index)}/>
             <input className = "team" type = 'number' value = {awayScore[index]} onChange = {(e) => handleAwayScoreChange(e, index)}/>
             <SubmitButton/>
            </form>
        </div>
        </li>
        ))}
      </ul>
    </div>
  )
}

export default Fixtures