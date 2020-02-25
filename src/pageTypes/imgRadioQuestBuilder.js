import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function imgRadioQuestBuilder({
  onReady,
  questionsCount,
  question,
  options,
  selectedOption
}) {
  let questWrapper = ElemCreator({ tag: "div", classList: "wrapper" });
  let schema = [
    {
      tag: "div",
      classList: "title-question",
      childNodes: [{ tag: "p", classList: "question", childNodes: [question] }]
    },
    {
      tag: "div",
      classList: "img-radio-options-container",
      childNodes: options.map((item, i) => {
        let option = {
          tag: "div",
          classList: "answer-img-radio",
          attrs: { id: i.toString() },
          onclick: () =>
            onReady({
              question: question,
              answer: item.optionDescr,
              selectedOption: i + 1
            }),
          childNodes: [
            {
              tag: "img",
              classList: "answer-img",
              attrs: { src: item.imgSrc }
            },
            { tag: "p", classList: "answer-text", value: item.optionDescr }
          ]
        };
        if (selectedOption && i == selectedOption - 1)
          option.classList = ["answer-img-radio", "selected"];
        return option;
      })
    }
  ];
  let imgRadioQuestion = CreateHTML(schema, questWrapper);
  return imgRadioQuestion;
}

export default imgRadioQuestBuilder;
