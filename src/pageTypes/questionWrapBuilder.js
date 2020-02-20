import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function questionWrapBuilder({ onClickPrev, onClickNext }) {
  let questionWrap = ElemCreator({ tag: "div", classList: "question-wrapper" });
  let schema = [
    {
      tag: "div",
      classList: "question-wrapper",
      attrs: { id: "question-wrapper" }
    },
    {
      tag: "div",
      classList: "footer",
      childNodes: [
        {
          tag: "button",
          classList: "prev-button",
          value: "назад",
          // attrs: { disabled: "disabled" },
          onclick: () => onClickPrev()
        },
        {
          tag: "button",
          classList: "next-button",
          value: "вперед",
          // attrs: { disabled: "disabled" },
          onclick: () => onClickNext()
        }
      ]
    }
  ];
  let questionWrapElem = CreateHTML(schema, questionWrap);
  return questionWrapElem;
}

export default questionWrapBuilder;
