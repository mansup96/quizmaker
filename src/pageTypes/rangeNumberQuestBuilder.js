import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function rangeNumberQuestBuilder({
  onReady,
  question,
  maxValue,
  minValue,
  defaultValue
}) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let delta = maxValue - minValue,
    gamma = defaultValue - minValue,
    defaultWidth = (gamma * 100) / delta;
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
          attrs: {
            style: "background-color: black; height: 20px; width: 100%"
          },
          childNodes: [
            {
              tag: "div",
              classList: "progress-indikator",
              attrs: {
                style: `position: relative; transition: .1s; background-color: red; height: 20px; width: ${defaultWidth}%`
              },
              childNodes: [
                {
                  tag: "p",
                  classList: "runner",
                  attrs: {
                    style: `position: absolute; height: 30px; width: 10px; right: -5px; background-color: green; margin: 0; top: -5px;`
                    // draggable: "true"
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ];
  let rangeQuestion = CreateHTML(schema, questWrapper);

  let input = rangeQuestion.querySelector(".range-input"),
    progressIndikator = rangeQuestion.querySelector(".progress-indikator"),
    progressBar = rangeQuestion.querySelector(".progressbar");

  input.addEventListener("input", () => {
    let progressWidth = ((input.value - minValue) * 100) / delta;
    progressIndikator.style.width = `${progressWidth}%`;
  });

  progressBar.addEventListener("mousedown", () => {
    if (event.which === 1) {
      let mousePos = event.clientX - progressBar.getBoundingClientRect().x,
        barWidth = progressBar.offsetWidth,
        step = barWidth / delta,
        widthFromMouse = Math.round(mousePos / step) + minValue;

      let progressWidth = ((widthFromMouse - minValue) * 100) / delta;
      progressIndikator.style.width = `${progressWidth}%`;
      input.value = widthFromMouse;
    }
  });

  let runner = rangeQuestion.querySelector(".runner");

  runner.addEventListener("mousedown", () => {
    if (event.which === 1) {
      console.log("sdfas");

      progressBar.addEventListener("mousemove", () => { 
        let mousePos = event.clientX - progressBar.getBoundingClientRect().x,
          barWidth = progressBar.offsetWidth,
          step = barWidth / delta,
          widthFromMouse = Math.round(mousePos / step) + minValue;

        let progressWidth = ((widthFromMouse - minValue) * 100) / delta;
        progressIndikator.style.width = `${progressWidth}%`;
        input.value = widthFromMouse;
      });
    }
  });

  return rangeQuestion;
}

export default rangeNumberQuestBuilder;
