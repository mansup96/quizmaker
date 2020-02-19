import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem"; 

function imgRadioQuestBuilder({ onReady, questionsCount, question, options }) {
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
          classList: "option",
          attrs: { id: i.toString() },
          onclick: () =>
            onReady({ question: question, answer: item.optionDescr }),
          childNodes: [
            {
              tag: "img",
              classList: "option-img",
              attrs: { src: item.imgSrc }
            },
            { tag: "p", classList: "option-descr", value: item.optionDescr }
          ]
        };
        return option;
      })
    }
  ];
  let imgRadioQuestion = CreateHTML(schema, questWrapper);
  return imgRadioQuestion;
}

export default imgRadioQuestBuilder;
