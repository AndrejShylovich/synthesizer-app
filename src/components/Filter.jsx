import { useContext, useCallback } from "react";
import { CTX } from "../store/Store";
import { FILTER_SLIDERS, FILTER_TYPES } from "../utils/constants";

const Filter = () => {
  const [appState, updateState] = useContext(CTX);
  const { filterSettings } = appState;
  const { type: activeFilterType } = filterSettings;

  const handleSliderChange = useCallback((e) => {
    const { id, value } = e.target;
    updateState({ 
      type: "CHANGE_FILTER", 
      payload: { id, value: parseFloat(value) } 
    });
  }, [updateState]);

  const handleFilterTypeChange = useCallback((filterType) => {
    updateState({ 
      type: "CHANGE_FILTER_TYPE", 
      payload: { id: filterType } 
    });
  }, [updateState]);

  const renderSlider = useCallback((param) => {
    const currentValue = filterSettings[param.id];
    
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
          onChange={handleSliderChange}
          aria-label={`${param.id} filter control`}
        />
      </div>
    );
  }, [filterSettings, handleSliderChange]);

  const renderFilterTypeButton = useCallback((filterType) => {
    const isActive = activeFilterType === filterType;
    
    return (
      <button
        key={filterType}
        type="button"
        onClick={() => handleFilterTypeChange(filterType)}
        className={isActive ? "active" : ""}
        aria-pressed={isActive}
        aria-label={`Select ${filterType} filter`}
      >
        {filterType}
      </button>
    );
  }, [activeFilterType, handleFilterTypeChange]);

  return (
    <div className="control">
      <h2>Filter</h2>
      
      <div className="filter-sliders">
        {FILTER_SLIDERS.map(renderSlider)}
      </div>
      
      <div className="filter-types">
        <h3>Filter Type</h3>
        <div className="button-group" role="group" aria-label="Filter type selection">
          {FILTER_TYPES.map(renderFilterTypeButton)}
        </div>
      </div>
    </div>
  );
};

export default Filter;