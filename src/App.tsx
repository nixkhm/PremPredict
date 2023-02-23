import "./App.css";
import Fixtures from "../components/Fixtures/Fixtures";
import Standings from "../components/Standings/Standings";

function App() {
  return (
    <div className="App">
      <Standings />
      <Fixtures />
    </div>
  );
}

export default App;
