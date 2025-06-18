import React from "react";
import Osc from "./Osc";

let actx = new AudioContext();
let gain1 = actx.createGain();
let filter = actx.createBiquadFilter();
let out = actx.destination;

gain1.connect(filter);
gain1.gain.value = 0.2;
filter.connect(out);

const CTX = React.createContext();
export { CTX };

let nodes = [];

export function reducer(state, action) {
  let { id, value, freq } = action.payload || {};
  switch (action.type) {
    case "MAKE_OSC":
      const newOsc = new Osc(
        actx,
        state.osc1Settings.type,
        freq,
        state.osc1Settings.detune,
        state.envelope,
        gain1
      );
      nodes.push(newOsc);
      return { ...state };
    case "KILL_OSC":
      const newNodes = [];
      nodes.forEach((node) => {
        if (Math.round(node.osc.frequency.value) === Math.round(freq)) {
          node.stop();
        } else {
          newNodes.push(node);
        }
      });
      nodes = newNodes;
      return { ...state };
    case "CHANGE_OSC1":
      return { ...state, osc1Settings: { ...state.osc1Settings, [id]: value } };
    case "CHANGE_OSC1_TYPE":
      return { ...state, osc1Settings: { ...state.osc1Settings, type: id } };
    case "CHANGE_FILTER":
      filter[id].value = value;
      return {
        ...state,
        filterSettings: { ...state.filterSettings, [id]: value },
      };
    case "CHANGE_FILTER_TYPE":
      filter.type = id;
      return {
        ...state,
        filterSettings: { ...state.filterSettings, type: id },
      };
    case "CHANGE_ADSR":
      return {
        ...state,
        envelope: { ...state.envelope, [id]: Number(value) },
      };
    default:
      console.log("reduce error. action: ", action);
      return { ...state };
  }
}

export default function Store(props) {
  const stateHook = React.useReducer(reducer, {
    osc1Settings: {
      detune: 0,
      type: "sine",
    },
    filterSettings: {
      frequency: filter.frequency.value,
      detune: filter.detune.value,
      type: filter.type,
      Q: filter.Q.value,
      gain: filter.gain.value,
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.6,
      release: 0.1,
    },
  });
  return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>;
}
