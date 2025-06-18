import "./App.scss";
import Osc1 from "./components/Osc1";
import Filter from "./components/Filter";
import Keyboard from "./components/Keyboard";
import ADSR from "./components/ADSR";

function App() {
  return (
    <div className="App">
      <Keyboard />
      <Osc1 />
      <ADSR />
      <Filter />
    </div>
  );
}

export default App;
