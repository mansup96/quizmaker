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
          classList: "progressbar-wrapper",
          attrs: {
            style: "background-color: black; height: 20px; width: 100%"
          },
          childNodes: [
            {
              tag: "div",
              classList: "progress-indikator",
              attrs: {
                style: `background-color: red; height: 20px; width: ${defaultWidth}%`
              }
            }
          ]
        }
      ]
    }
  ];
  let rangeQuestion = CreateHTML(schema, questWrapper);

  let input = rangeQuestion.querySelector(".range-input"),
    progressIndikator = rangeQuestion.querySelector(".progress-indikator");

  input.addEventListener("input", changeProgress());

  function changeProgress() {
    console.log(input.value);

    gamma = input.value;
    progressIndikator.style.width = defaultWidth;
  }

  return rangeQuestion;
}

export default rangeNumberQuestBuilder;
