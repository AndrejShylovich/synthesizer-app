import "./App.scss";
import Oscillator from "./components/Oscillator";
import Filter from "./components/Filter";
import Keyboard from "./components/Keyboard";
import ADSR from "./components/ADSR";
import Info from "./components/Info";

function App() {
  return (
    <div className="App">
        <Keyboard />
        <Oscillator />
        <ADSR />
        <Filter />
        <Info />
    </div>
  );
}

export default App;
