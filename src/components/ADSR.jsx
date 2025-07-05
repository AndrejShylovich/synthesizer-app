import { useContext, useCallback } from "react";
import { CTX } from "../store/Store";
import { ADSR_PARAMS } from "../utils/constants";

const ADSR = () => {
  const [appState, updateState] = useContext(CTX);
  
  const { envelope } = appState;

  const handleEnvelopeChange = useCallback((e) => {
    const { id, value } = e.target;
    updateState({ 
      type: "CHANGE_ADSR", 
      payload: { id, value: parseFloat(value) } 
    });
  }, [updateState]);

  const renderParameter = useCallback((param) => {
    const currentValue = envelope[param.id];
    
    return (
      <div key={param.id} className="params">
        <label htmlFor={param.id}>
          <h3>{param.id} : {currentValue}</h3>
        </label>
        <input
          id={param.id}
          type="range"
          min={param.min || 0}
          max={param.max}
          step={param.step}
          value={currentValue}
          onChange={handleEnvelopeChange}
          aria-label={`${param.id} control`}
        />
      </div>
    );
  }, [envelope, handleEnvelopeChange]);

  return (
    <div className="control">
      <h2>ADSR</h2>
      {ADSR_PARAMS.map(renderParameter)}
    </div>
  );
};

export default ADSR;