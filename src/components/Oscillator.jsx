import { useContext, useCallback } from "react";
import { CTX } from "../store/Store";
import { DETUNE_CONFIG, WAVE_TYPES } from "../utils/constants";


const Oscillator = () => {
  const [appState, updateState] = useContext(CTX);
  const { oscSettings } = appState;
  const { detune, type: activeWaveType } = oscSettings;

  const handleDetuneChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      updateState({
        type: "CHANGE_OSC",
        payload: { id, value: parseInt(value, 10) },
      });
    },
    [updateState]
  );

  const handleWaveTypeChange = useCallback(
    (waveType) => {
      updateState({
        type: "CHANGE_OSC_TYPE",
        payload: { id: waveType },
      });
    },
    [updateState]
  );

  const renderWaveButton = useCallback(
    (wave) => {
      const isActive = activeWaveType === wave.id;

      return (
        <button
          key={wave.id}
          type="button"
          onClick={() => handleWaveTypeChange(wave.id)}
          className={isActive ? "wave-button active" : "wave-button"}
          aria-pressed={isActive}
          aria-label={`Select ${wave.label} wave`}
        >
          {wave.label.toLowerCase()}
        </button>
      );
    },
    [activeWaveType, handleWaveTypeChange]
  );

  return (
    <div className="control">
      <h2>Oscillator</h2>

      <div className="param-group">
        <div className="param">
          <label htmlFor="detune">
            <h3>Detune: {detune} Hz</h3>
          </label>
          <div className="input-container">
            <input
              id="detune"
              type="range"
              min={DETUNE_CONFIG.min}
              max={DETUNE_CONFIG.max}
              step={DETUNE_CONFIG.step}
              value={detune}
              onChange={handleDetuneChange}
              aria-label="Detune control"
            />
          </div>
        </div>

        <div className="param">
          <h3>Wave Type</h3>
          <div
            className="button-group-stable"
            role="group"
            aria-label="Wave type selection"
          >
            {WAVE_TYPES.map(renderWaveButton)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
