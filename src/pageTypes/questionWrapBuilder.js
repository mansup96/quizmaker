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
    readyWidth = step * pageIndex;
  console.log(readyWidth);

  let schema = [
    {
      tag: "div",
      classList: "quiz-top",
      childNodes: [
        {
          tag: "div",
          classList: "quiz-title-wrapper",
          childNodes: [
            {
              tag: "span",
              classList: "title-icon",
              value: `<svg viewBox="0 0 24 24" class="button-svg">
											<title>mdi-file-document-box-check-outline</title>
											<path d="M17,21L14.25,18L15.41,16.84L17,18.43L20.59,14.84L21.75,16.25M12.8,21H5C3.89,21 3,20.11 
													3,19V5C3,3.89 3.89,3 5,3H19C20.11,3 21,3.89 21,5V12.8C20.39,12.45 19.72,12.2 19,12.08V5H5V19H12.08C12.2,19.72 
													12.45,20.39 12.8,21M12,17H7V15H12M14.68,13H7V11H17V12.08C16.15,12.22 15.37,12.54 14.68,13M17,9H7V7H17" fill='#a4cc00'>
											</path>
									</svg>`
            },
            {
              tag: "p",
              classList: "quiz-title",
              value: quizTitle
            }
          ]
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
                  value: " " + readyWidth.toString() + "%"
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

  return questionWrapElem;
}

export default questionWrapBuilder;
