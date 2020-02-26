import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function chechQuestBuilder({ onReady, question, options, selectedOption }) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: "options-container",
      childNodes: options.map((item, i) => {
        let option = {
          tag: "div",
          classList: "answer-check",
          attrs: { id: i.toString() },
          onclick: () =>
            onReady({
              question: question,
              answer: item,
              selectedOption: i + 1
            }),
          childNodes: [
            {
              tag: "span",
              classList: "answer-text",
              value: item
            }
          ]
        };
        if (selectedOption && i == selectedOption - 1)
          option.classList = ["answer-check", "selected"];
        return option;
      })
    }
  ];
  let checkQuestion = CreateHTML(schema, questWrapper);

  let selectedAnswers = checkQuestion.querySelectorAll(".answer-check");

  selectedAnswers.forEach(elem => {
    elem.addEventListener("click", () => {
      elem.classList.toggle("selected");
    });
  });

  return checkQuestion;
}

export default chechQuestBuilder;
