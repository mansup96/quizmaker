import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function radioPageBuilder({ onReady, question, options, selectedOption }) {
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
      childNodes: [
        {
          tag: "ul",
          classList: "option-list",
          childNodes: options.map((item, i) => {
            let option = {
              tag: "li",
              classList: "option",
              value: item,
              attrs: { id: i.toString() },
              onclick: () =>
                onReady({
                  question: question,
                  answer: item,
                  selectedOption: i + 1
                })
            };
            if (selectedOption && i == selectedOption - 1)
              option.classList = ["option", "selected"];
            return option;
          })
        }
      ]
    }
  ];
  let radioQuestion = CreateHTML(schema, questWrapper);
  return radioQuestion;
}

export default radioPageBuilder;
