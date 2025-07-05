import { useContext, useEffect } from "react";
import { CTX } from "../store/Store";
import QwertyHancock from "qwerty-hancock";
import { KEYBOARD_CONFIG } from "../utils/constants";

const Keyboard = () => {
  const [, updateState] = useContext(CTX);

  useEffect(() => {
    const keyboard = new QwertyHancock({
      ...KEYBOARD_CONFIG
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
