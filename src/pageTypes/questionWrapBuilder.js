import CreateHTML from "../utils/createHTMLBranch";
import ElemCreator from "../utils/createElem";

function questionWrapBuilder({
  onClickPrev,
  onClickNext,
  prevDisable,
  nextDisable,
  quizTitle,
  pagesCount,
  pageIndex
}) {
  let questionWrap = ElemCreator({ tag: "div", classList: "quiz-inner" });

  let step = 100 / pagesCount,
    readyWidth = step * (pageIndex + 1);
  console.log(readyWidth);

  let schema = [
    {
      tag: "div",
      classList: "quiz-top",
      childNodes: [
        {
          tag: "p",
          classList: "quiz-title",
          value: quizTitle
        },
        {
          tag: "div",
          classList: "question-wrapper",
          attrs: { id: "question-wrapper" }
        }
      ]
    },
    {
      tag: "div",
      classList: "footer",
      childNodes: [
        {
          tag: "div",
          classList: "progressbar-wrapper",
          childNodes: [
            {
              tag: "div",
              classList: "progressbar__label",
              value: "Готово:",
              childNodes: [
                {
                  tag: "span",
									classList: "ready-value",
									value: readyWidth.toString()
                }
              ]
            },
            {
              tag: "div",
              classList: "progressbar__field",
              childNodes: [
                {
                  tag: "span",
                  classList: "progressbar__ready",
                  attrs: {
                    style: `width:${readyWidth}%`
                  }
                }
              ]
            }
          ]
        },
        {
          tag: "div",
          classList: "buttons",
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
      ]
    }
  ];
  let questionWrapElem = CreateHTML(schema, questionWrap),
    prevBtn = questionWrapElem.querySelector(".prev-button"),
    nextBtn = questionWrapElem.querySelector(".next-button");

  if (prevDisable) {
    prevBtn.setAttribute("disabled", 1);
  }
  if (nextDisable) {
    nextBtn.setAttribute("disabled", 1);
  }

  // let title =  ElemCreator({ tag: "p", classList: "quiz-title", value: quizTitle })
  // questionWrapElem.prepend(title)
  return questionWrapElem;
}

export default questionWrapBuilder;
