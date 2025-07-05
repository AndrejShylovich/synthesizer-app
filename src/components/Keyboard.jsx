import { useContext, useEffect } from "react";
import { CTX } from "../store/Store";
import QwertyHancock from "qwerty-hancock";

const Keyboard = () => {
  const [, updateState] = useContext(CTX);

  useEffect(() => {
    const keyboard = new QwertyHancock({
      id: "keyboard",
      width: "1182",
      height: "100",
      octaves: 6,
      startNote: "A2",
      whiteKeyColour: "rgb(255, 255, 255)",
      blackKeyColour: "rgb(0, 8, 22)",
      activeKeyColour: "rgb(166,49,172)",
      borderColour: "",
    });
    keyboard.keyDown = (note, freq) => {
      updateState({ type: "MAKE_OSC", payload: { note, freq } });
    };
    keyboard.keyUp = (note, freq) => {
      updateState({ type: "KILL_OSC", payload: { note, freq } });
    };
  }, [updateState]);

  return (
    <div className="keyboard">
      <div id="keyboard"></div>
    </div>
  );
};

export default Keyboard;
