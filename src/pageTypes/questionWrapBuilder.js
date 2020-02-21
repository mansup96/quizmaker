import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function questionWrapBuilder({
  onClickPrev,
  onClickNext,
  prevDisable,
  nextDisable
}) {
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
          onclick: () => onClickPrev()
        },
        {
          tag: "button",
          classList: "next-button",
          value: "вперед",
          onclick: () => onClickNext()
        }
      ]
    }
  ];
  let questionWrapElem = CreateHTML(schema, questionWrap),
    prevBtn = questionWrapElem.querySelector(".prev-button"),
    nextBtn = questionWrapElem.querySelector(".next-button");

  if (prevDisable) {
    prevBtn.setAttribute("disabled",1);
  }
  if (nextDisable) {
    nextBtn.setAttribute("disabled",1);
  }
  return questionWrapElem;
}

export default questionWrapBuilder;
