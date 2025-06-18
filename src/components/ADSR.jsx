import { useContext } from "react";
import { CTX } from "../store/Store";

const ADSR = () => {
  const [appState, updateState] = useContext(CTX);
  let { attack, decay, sustain, release } = appState.envelope;

  const change = (e) => {
    let { id, value } = e.target;
    console.log(attack, decay, sustain, release)
    updateState({ type: "CHANGE_ADSR", payload: { id, value } });
  };
  return (
    <div className="control">
      <h2>ADSR</h2>
      <div className="params">
        <h3>attack</h3>
        <input
          onChange={change}
          type="range"
          id="attack"
          max='2'
          step='0.02'
          value={attack}
        />
      </div>
      <div className="params">
        <h3>decay</h3>
        <input
          onChange={change}
          type="range"
          id="decay"
          max='1'
          step='0.01'
          value={decay}
        />
      </div>
      <div className="params">
        <h3>sustain</h3>
        <input
          onChange={change}
          type="range"
          id="sustain"
          max='1'
          step='0.01'
          value={sustain}
        />
      </div>
      <div className="params">
        <h3>release</h3>
        <input
          onChange={change}
          type="range"
          id="release"
          max='2'
          step='0.02'
          value={release}
        />
      </div>
    </div>
  );
};

export default ADSR;
