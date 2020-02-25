import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function rangeNumberQuestBuilder({
  onReady,
  question,
  maxValue,
  minValue,
  defaultValue,
  selectedOption
}) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let delta = maxValue - minValue,
    gamma = defaultValue - minValue;
  if (selectedOption) {
    gamma = selectedOption - minValue;
    defaultValue = selectedOption;
  }
  let defaultWidth = (gamma * 100) / delta;
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: "options-container",
      childNodes: [
        {
          tag: "input",
          classList: "range-input",
          attrs: {
            type: "number",
            min: minValue,
            max: maxValue,
            value: defaultValue
          }
        },
        {
          tag: "div",
          classList: "progressbar",
          childNodes: [
            {
              tag: "div",
              classList: "progress-indikator",
              attrs: {
                style: `width: ${defaultWidth}%`
              },
              childNodes: [
                {
                  tag: "p",
                  classList: "runner"
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  function addHandler(object, event, handler) {
    if (object.addEventListener) {
      object.addEventListener(event, handler, false);
    } else alert("Обработчик не поддерживается");
  }
  function removeHandler(object, event, handler) {
    object.removeEventListener(event, handler, false);
  }

  let rangeQuestion = CreateHTML(schema, questWrapper);

  let input = rangeQuestion.querySelector(".range-input"),
    progressIndikator = rangeQuestion.querySelector(".progress-indikator"),
    progressBar = rangeQuestion.querySelector(".progressbar");
  onReady({
    question: question,
    answer: input.value,
    selectedOption: input.value
  });

  addHandler(input, "input", syncBarWithInput);
  function syncBarWithInput() {
    if (input.value <= maxValue) {
      let progressWidth = ((input.value - minValue) * 100) / delta;
      progressIndikator.style.width = `${progressWidth}%`;
      progressIndikator.style.transition = `.2s`;
      onReady({
        question: question,
        answer: input.value,
        selectedOption: input.value
      });
    }
  }

  addHandler(progressBar, "mousedown", getValueFromMouse);
  function getValueFromMouse() {
    if (event.which === 1) {
      event.preventDefault();
      let mousePos = event.clientX - progressBar.getBoundingClientRect().x,
        barWidth = progressBar.offsetWidth,
        step = barWidth / delta,
        widthFromMouse = Math.round(mousePos / step) + minValue;
      if (mousePos < barWidth && mousePos > 0) {
        let progressWidth = ((widthFromMouse - minValue) * 100) / delta;
        progressIndikator.style.width = `${progressWidth}%`;
        input.value = widthFromMouse;
        onReady({
          question: question,
          answer: input.value,
          selectedOption: input.value
        });
      }
    }
  }

  let runner = rangeQuestion.querySelector(".runner");

  addHandler(runner, "mousedown", addMouseMoveToRunner);

  function addMouseMoveToRunner() {
    if (event.which === 1) {
      addHandler(window, "mousemove", getValueFromMouse);
      progressIndikator.style.transition = `none`;
    }
  }

  addHandler(runner, "mouseup", mouseUp);
  function mouseUp() {
    progressIndikator.style.transition = `0.2s`;
    removeHandler(window, "mousemove", getValueFromMouse);
    onReady({
      question: question,
      answer: input.value,
      selectedOption: input.value
    });
  }
  return rangeQuestion;
}

export default rangeNumberQuestBuilder;
