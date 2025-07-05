export const ADSR_PARAMS = [
  { id: "attack", max: 2, step: 0.02 },
  { id: "decay", max: 1, step: 0.01 },
  { id: "sustain", max: 1, step: 0.01 },
  { id: "release", max: 2, step: 0.02 }
];

export const FILTER_SLIDERS = [
  { id: "frequency", max: 10000, step: 1 },
  { id: "detune", max: 10000, step: 1 },
  { id: "Q", max: 10, step: 0.1 },
  { id: "gain", max: 10, step: 0.1 }
];

export const FILTER_TYPES = [
  "lowpass",
  "highpass",
  "notch",
  "lowshelf",
  "highshelf"
];

export const KEYBOARD_CONFIG = {
  id: "keyboard",
  width: "1188",
  height: "100",
  octaves: 6,
  startNote: "A2",
  whiteKeyColour: "rgb(255, 255, 255)",
  blackKeyColour: "rgb(0, 8, 22)",
  activeKeyColour: "rgb(166,49,172)",
  borderColour: ""
};

export const WAVE_TYPES = [
  { id: "sine", label: "Sine" },
  { id: "triangle", label: "Triangle" },
  { id: "square", label: "Square" },
  { id: "sawtooth", label: "Sawtooth" },
];

export const DETUNE_CONFIG = {
  min: -5000,
  max: 5000,
  step: 1,
};

export const SECTIONS = [
    {
      title: "Осциллятор в Web Audio API",
      content: "Это источник звука, который генерирует периодические волны разных форм."
    },
    {
      title: "Основные типы волн",
      items: [
        "sine (синусоида) — чистый тон без гармоник",
        "triangle (треугольная) — мягкий звук с нечетными гармониками",
        "square (прямоугольная) — резкий, «гудящий» звук (как 8-битная музыка)",
        "sawtooth (пилообразная) — яркий, насыщенный звук со всеми гармониками"
      ]
    },
    {
      title: "ADSR (Огибающая амплитуды)",
      description: "Параметры, определяющие, как звук меняется во времени:",
      items: [
        "Attack (Атака) — время нарастания звука от нуля до пиковой громкости.",
        "Decay (Спад) — время уменьшения громкости после атаки до уровня Sustain.",
        "Sustain (Сустейн) — уровень громкости, который сохраняется, пока нажата клавиша.",
        "Release (Затухание) — время, за которое звук исчезает после отпускания клавиши."
      ]
    },
    {
      title: "Фильтры",
      description: "Изменяют частотный спектр звука. Основные параметры:",
      items: [
        "frequency (Частота среза) - определяет, какие частоты фильтр пропускает, а какие ослабляет.",
        "detune (Расстройка) - тонкая подстройка частоты в центах (1/100 полутона).",
        "Q (Добротность) - усиление/ослабление частоты вокруг точки среза.",
        "gain (Усиление) - используется в peaking, highshelf, lowshelf фильтрах. Усиливает или ослабляет выбранный диапазон частот (в децибелах)."
      ]
    },
    {
      title: "Типы фильтров",
      items: [
        "lowpass — пропускает низкие частоты, режет высокие.",
        "highpass — наоборот, режет низкие.",
        "lowshelf — усиливает или ослабляет низкие частоты (всё, что ниже частоты среза).",
        "highshelf - усиливает или ослабляет высокие частоты (всё, что выше частоты среза).",
        "notch — режет узкую полосу частот (антирезонанс)."
      ]
    }
  ];